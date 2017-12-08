import RPi.GPIO as GPIO
forwardPin = 27

GPIO.setmode(GPIO.BCM)

GPIO.setup(27, GPIO.OUT)
try:
    while True:
        GPIO.output(forwardPin, GPIO.HIGH)
except:
    GPIO.cleanup()
