from abc import ABC, abstractmethod

class InterfaceA(ABC):
    @abstractmethod
    def method_a(self):
        pass
    
class InterfaceB(ABC):
    @abstractmethod
    def method_b(self):
        pass
    
class ClassA(InterfaceA, InterfaceB):
    def method_a(self):
        print("Method A")
    
    def method_b(self):
        print("Method B")


def main():
    obj = ClassA()
    obj.method_a()
    obj.method_b()

if __name__ == "__main__":
    main()