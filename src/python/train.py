import time

def train():
    time.sleep(1)
    return lambda x: x+5

model = train()
print("model trained:", model)