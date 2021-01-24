from sklearn.datasets import load_iris
from sklearn.svm import LinearSVC
from sklearn.model_selection import train_test_split

# Load the dataset
iris = load_iris()
X = iris.data
y = iris.target

# Split the dataset into train and test
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.1, random_state=42
)

# Train a classifier
clf = LinearSVC()
clf.fit(X_train, y_train)

# Verify the score of the clf
print("Model Score:", clf.score(X_test, y_test))