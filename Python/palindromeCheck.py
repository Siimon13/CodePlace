import unittest

def isAlphaNum(char):
    return (char >= 'a' and char <= 'z') or ( char >= 'A' and char <= 'Z' ) or ( char >= '0' and char <= '9')


def checkPalindrome(wordToCheck):
    halfLenOfWord = len(wordToCheck) // 2
        
    #If Completely Seralized
    # for i in range(halfLenOfWord):
    #     if wordToCheck[i] != wordToCheck[len(wordToCheck)-i-1]:
    #         return False

    # return True

    # return wordToCheck[:halfLenOfWord] == wordToCheck[halfLenOfWord:] if halfLenOfWord % 2 == 0 else wordToCheck[:halfLenOfWord] == wordToCheck[halfLenOfWord+1:]
    
    #No Restrictions

    # return wordToCheck == wordToCheck[::-1]
    
    #Unsteralized Code
    i = 0
    j = len(wordToCheck) - 1
        
    while (j > i):
        if not isAlphaNum(wordToCheck[i]):
            i+=1
            continue

        if not wordToCheck[j].isalnum():
            j-=1
            continue

        
        if wordToCheck[i] != wordToCheck[j]:
            return False
        i+=1
        j-=1
        

    return True
        
class Test(unittest.TestCase):
    

    def testTrue0(self):
        self.assertEqual(checkPalindrome('tt'),  True)
        
    def testTrue(self):
        self.assertEqual(checkPalindrome('tacocat'),  True)

    def testTrue2(self):
        self.assertEqual(checkPalindrome('wow'),  True)

    def testTrue3(self):
        self.assertEqual(checkPalindrome(''),  True)

    def testTrue4(self):
        self.assertEqual(checkPalindrome('  '),  True)

    def testFalse1(self):
        self.assertEqual(checkPalindrome('w oe'),  False)

    def testTrue5(self):
        self.assertEqual(checkPalindrome('w.ow'),  True)

if __name__ == "__main__":
    
    unittest.main()
    # checkPalindrome('tacocat')
