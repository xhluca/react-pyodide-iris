import js

X_inp = [[
    float(js.data.sep_len),
    float(js.data.sep_wid),
    float(js.data.pet_len),
    float(js.data.pet_wid),
]]
y_pred = int(clf.predict(X_inp))
pred_name = iris.target_names[y_pred]
print("Model predicted:", pred_name)

# Pass this to pyodide
pred_name