import ImageEditor from '@react-native-community/image-editor'
import React, { useRef } from 'react'
import { Dimensions, Text, TouchableOpacity, View } from 'react-native'
import { Camera, useCameraDevices } from 'react-native-vision-camera'
import { useDrawContext } from '../contexts/DrawProvider'
import useWatchDrawing from '../hooks/useWatchDrawing'

interface Props {
  exportFn?: (url: string) => void
}

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function CameraContent({ exportFn }: Props) {
  const devices = useCameraDevices('wide-angle-camera')
  const camera = useRef<Camera>(null)
  const {
    commands: { setState }
  } = useDrawContext()
  const tmpURL = useWatchDrawing(s => s.tmpURL)
  const device = devices.back

  if (device == null) return <View />
  else
    return (
      <>
        <View
          style={{
            flex: 1,
            borderRadius: 20,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Camera
            ref={camera}
            style={{
              width: windowWidth,
              height: (windowWidth * 3) / 4
            }}
            device={device}
            photo={true}
            isActive={!tmpURL}
          />

          <View
            style={{
              position: 'absolute',
              bottom: 10,
              left: 0,
              right: 0,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: tmpURL ? -1 : 1
            }}
          >
            {/* <TouchableOpacity
              style={{
                borderRadius: 1000,
                height: 40,
                width: 40,
                backgroundColor: '#fffa',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={{ color: '#333' }}>1:1</Text>
            </TouchableOpacity> */}


            <TouchableOpacity
              onPress={async () => {
                const data = await camera?.current?.takePhoto({
                  qualityPrioritization: 'speed',
                  enableAutoRedEyeReduction: true
                })

                if (data?.path) {
                  const width =
                    data.width < data.height ? data.width : data.height

                  const height =
                    data.width < data.height ? data.height : data.width

                  const cropData = {
                    offset: {
                      x: 0,
                      y: (height - (width * 3) / 4) / 2
                    },
                    size: {
                      height: (width * 3) / 4,
                      width: width
                    }
                  }

                  ImageEditor.cropImage(data?.path, cropData)
                    .then(tmpFile => {
                      setState({
                        tmpURL: tmpFile
                      })
                    })
                    .catch(reason => {
                      setState({
                        tmpURL: data?.path
                      })
                    })
                }
              }}
            >
              <View
                style={{
                  padding: 2,
                  borderWidth: 4,
                  borderColor: '#fff',
                  borderRadius: 999
                }}
              >
                <View
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: '#fff',
                    borderRadius: 999
                  }}
                />
              </View>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={{
                borderRadius: 1000,
                height: 40,
                width: 40,
                backgroundColor: '#fffa',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={{ color: '#333' }}>4:3</Text>
            </TouchableOpacity> */}
          </View>
        </View>

        <View
          style={{
            height: 50,
            paddingHorizontal: 12,
            paddingVertical: 6,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          {tmpURL && (
            <>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 999,
                  backgroundColor: '#aa99996d'
                }}
                onPress={() => {
                  setState({
                    tmpURL: undefined
                  })
                }}
              >
                <Text style={{ color: '#fff', fontWeight: '600' }}>Retake</Text>
              </TouchableOpacity>

              <View style={{ flex: 1 }}></View>

              <TouchableOpacity
                style={{
                  paddingHorizontal: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 999,
                  backgroundColor: '#aa99996d',
                  marginRight: 10
                }}
                onPress={() => {
                  setState({
                    mode: 'edit'
                  })
                }}
              >
                <Text style={{ color: '#fff', fontWeight: '600' }}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  paddingHorizontal: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 999,
                  backgroundColor: '#aa99996d'
                }}
                onPress={() => {
                  exportFn && exportFn(tmpURL)
                }}
              >
                <Text style={{ color: '#fff', fontWeight: '600' }}>Upload</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </>
    )
}
