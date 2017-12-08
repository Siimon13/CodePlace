import picamera
from time import sleep
camera = picamera.PiCamera()

camera.vflip = True
camera.hflip = True




for i in range(10):
    sleep(1)
    camera.capture("safe4" + str(i) + ".jpg")
