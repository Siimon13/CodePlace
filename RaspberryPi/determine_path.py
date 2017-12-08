from clarifai.rest import ClarifaiApp
from time import sleep
import RPi.GPIO as GPIO
import picamera
from pprint import pprint

camera = picamera.PiCamera()

camera.vflip = True

GPIO.setmode(GPIO.BCM)

#Contorl Pins
leftPin = 17
rightPin = 18
forwardPin = 27
backwardPin = 22

GPIO.cleanup()
#Pin Setup
GPIO.setup(leftPin, GPIO.OUT)
GPIO.setup(rightPin, GPIO.OUT)
GPIO.setup(forwardPin, GPIO.OUT)
GPIO.setup(backwardPin, GPIO.OUT)

def check_current_img():
    app = ClarifaiApp()
    model = app.models.get('my-first-application')
    response = model.predict_by_filename("curr_scene.jpg")

    #pprint(response)
    return response

if __name__ == "__main__":
    while true:
        print("Running car program")
    
        camera.capture("curr_scene.jpg")
    
        status =  check_current_img()["outputs"][0]["data"]["concepts"][0]["app_id"]

        timeToTravel = .5
    
        if(status == 'safe'): #if status is safe moveforward
            print("push forward")
            GPIO.output(forwardPin, True)
        else:
            GPIO.output(leftPin, Tru)e
            GPIO.output(forwardPin, True)
            
        GPIO.output(forwardPin, False)
        GPIO.output(backwardPin, False)
        GPIO.output(leftPin, False)
        GPIO.output(rightPin, False)        

