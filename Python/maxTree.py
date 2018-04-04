import unittest

class Node:
    def __init__(self):
        self.right = None
        self.left = None
        self.value = None

class TestTree(unittest.TestCase):
    def test_First(self):
        root = Node()
        MaxTree([1,2,3],root)

        self.assertEqual(3,  root.value)
        self.assertEqual(2,  root.left.value)
        self.assertEqual(None,  root.right.value)

    def test_Second(self):
        root = Node()
        MaxTree([1,3,2],root)

        self.assertEqual(3,  root.value)
        self.assertEqual(1,  root.left.value)
        self.assertEqual(2,  root.right.value)


def MaxTree(arr, curr_node):
    if len(arr) == 0:
        return
    
    max_ind = None
    
    for i in range(len(arr)):
        if not max_ind or arr[i] > arr[max_ind]:
            max_ind = i

    curr_node.value = arr[max_ind]
    curr_node.left = Node()
    MaxTree(arr[:max_ind], curr_node.left) #Transverse through left tree
    curr_node.right = Node()
    MaxTree(arr[max_ind+1:], curr_node.right) #Transverse through left tree

if __name__ == "__main__":
    
    unittest.main()
        
