import RPI.GPIO as GPIO
import time

# Setting up Raspberry Pi to use BCM pin numbers
GPIO.setmode(GPIO.BCM)

#Setting pin 3 
inputPin = 3
GPIO.setup(3, GPIO.IN)


# create discharge function for reading capacitor data
def discharge():
    GPIO.setup(inputPin, GPIO.OUT)
    GPIO.output(inputPin, False)
    time.sleep(0.005)

# create time function for capturing analog count value
def charge_time():
    GPIO.setup(inputPin, GPIO.IN)
    count = 0
    while not GPIO.input(inputPin):
        count = count +1
    return count

# create analog read function for reading charging and discharging data
def analog_read():
    discharge()
    return charge_time()

while true:
    print(analog_read())
    time.sleep(1)
