import React, { useRef } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Camera, useCameraDevices } from 'react-native-vision-camera'
import { CircleIcon } from '../assets'
import { useDrawContext } from '../contexts/DrawProvider'

export default function TestCamera() {
  const devices = useCameraDevices('wide-angle-camera')
  // const isFocused = useIsFocused()
  const camera = useRef<Camera>(null)
  const {
    commands: { setState }
  } = useDrawContext()

  const device = devices.back

  device?.formats.forEach(e => console.log(e.photoWidth, e.photoHeight))

  if (device == null) return <View />

  return (
    <View
      style={{
        flex: 1,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Camera
        ref={camera}
        style={{ width: 390, height: 390, borderRadius: 10 }}
        device={device}
        isActive={true}
        photo={true}
        format={
          {
            ...devices.back?.formats[0],
            photoWidth: 1000,
            photoHeight: 1000
          } as any
        }
      />

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
          <CircleIcon fill='#fff' width={40} height={40} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
