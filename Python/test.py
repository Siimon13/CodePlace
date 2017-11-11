import math
from random import randint, sample

def find10bitPrimeNumber(num_tries):

        limRandom = 2**10 - 1 #randInt is inclusive
        beginRandom = 2**9

        while(True): #Utilizing Miller-Rabin Primmality Test
                testNum = randint(beginRandom, limRandom)

                testRange = sample(range(1,testNum), num_tries)
                isPrime = True
                
                for i in testRange:
                        if i**(testNum-1)  % testNum != 1:
                                isPrime = False
                                break
                if(isPrime):
                        return testNum

# primeNum = find10bitPrimeNumber(20)
# print(primeNum)



numMappings = {
        0: [""],
        1: [""],
        2: ["A","B","C"],
        3: ["D","E","F"],
        4: ["G","H","I"],
        5: ["J","K","L"],
        6: ["M","N","O"],
        7: ["P","Q","R","S"],
        8: ["T","U","V"],
        9: ["W","X","Y","Z"]
}

def recursePhoneNum(num):
        if len(num) == 0:
                return [""]

        currNum = int(num[0])
        
        currList = numMappings[currNum]

        listOfString = []
        currStr = ""
        for i in currList:
                currStr = i

                for  s in recursePhoneNum(num[1:]):
                        listOfString.append(currStr + s)
                        
        return listOfString
        


        
num = "646"
ans = recursePhoneNum(num)

print(len(ans))
Node = {
        left : None,
        right : None,
        value : None
}

def serializeTree(root, anslst):
        if (root == None):
                return

        serializeTree(root.left, anslst)
        anslst.append(root.value)
        serializeTree(root.right, anslst)


[1,2,4,5,3,5,1,2]

def deserializeTree(anslst):
        med = math.ceil(len(anslst),2)

        root = Node(med)
        if (len(anslst)-1):
                root.right = anslst[med+1]
                deserializeTree(anslst[med+1:])
                
        if(med > 0):
                root.left = anslst[med-1]
                deserializeTree(anslst[:med])

        return root

