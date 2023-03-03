import React, { useRef } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Camera, useCameraDevices } from 'react-native-vision-camera'
import { useDrawContext } from '../contexts/DrawProvider'
import useWatchDrawing from '../hooks/useWatchDrawing'
export default function TestCamera() {
  const devices = useCameraDevices('wide-angle-camera')
  // const isFocused = useIsFocused()
  const camera = useRef<Camera>(null)
  const {
    commands: { setState }
  } = useDrawContext()

  const baseURL = useWatchDrawing(s => s.baseURL)

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
            style={StyleSheet.absoluteFill}
            device={device}
            photo={true}
            isActive={!baseURL}
          />

          {baseURL && (
            <Image
              style={[StyleSheet.absoluteFill, { zIndex: 100 }]}
              source={{
                uri: 'file:' + baseURL || ''
              }}
            />
          )}

          <View
            style={{
              position: 'absolute',
              bottom: 10,
              left: 0,
              right: 0,
              flexDirection: 'row',
              justifyContent: 'center'
            }}
          >
            <TouchableOpacity
              onPress={async () => {
                const data = await camera?.current?.takePhoto({
                  qualityPrioritization: 'speed',
                  enableAutoRedEyeReduction: true
                })

                if (data?.path) {
                  setState({
                    baseURL: data.path
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
                baseURL: undefined
              })
            }}
          >
            <Text style={{ color: '#fff' }}>Retake</Text>
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
              setState({
                mode: 'edit'
              })
            }}
          >
            <Text style={{ color: '#fff' }}>Use photo</Text>
          </TouchableOpacity>
        </View>
      </>
    )
}
