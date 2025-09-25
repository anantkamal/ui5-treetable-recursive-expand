# ui5-treetable-recursive-expand

## 🌟 What is this?
SAPUI5's `sap.ui.table.TreeTable` lets you expand/collapse nodes, but it doesn’t provide a way to **expand all selected nodes recursively down to the leaf nodes**.  

I needed this for a project, so I extended the [official TreeTable sample](https://ui5.sap.com/#/entity/sap.ui.table.TreeTable/sample/sap.ui.table.sample.TreeTable.JSONTreeBinding) and added a helper that does exactly that.

---

## 🚀 Features
- Collapse all nodes
- Collapse only selected nodes
- Expand first level (all / selection)
- **Expand all levels recursively for selected nodes** ✅

---

## ⚙️ How it works
- Select one or more nodes in the TreeTable.
- Click “Expand all levels for selection.”
- A recursive function expands each node and drills down into its children.
- Small async delays are used to keep the UI responsive.

---

## ▶️ Run Locally
1. Clone this repo:
   ```bash
   git clone https://github.com/<your-username>/ui5-treetable-recursive-expand.git
2. Install UI5 tooling (if you don’t have it):
    npm install --global @ui5/cli
3. Start the app:
    ui5 serve -o index.html

---

## ⚠️ Notes

Works with JSON model and fully loaded OData model.
Won’t work with OData lazy-loading via navigation.
Not recommended for very large datasets (performance hit).

---

## 📜 License
This project is licensed under the [Apache License 2.0](LICENSE).