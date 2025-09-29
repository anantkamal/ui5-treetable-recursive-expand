sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("openui5.treetable.recursiveexpand.controller.CatalogHierarchy", {
        onInit() {
        },

         // Collapse all nodes
		onCollapseAll: function() {
			const oTreeTable = this.byId("TreeTableBasic");
			oTreeTable.collapseAll();
		},

        // Collapse only selected nodes
		onCollapseSelection: function() {
			const oTreeTable = this.byId("TreeTableBasic");
			oTreeTable.collapse(oTreeTable.getSelectedIndices());
		},

        // Expand first-level nodes for the entire tree
		onExpandFirstLevelForAll: function() {
			const oTreeTable = this.byId("TreeTableBasic");
			oTreeTable.expandToLevel(1);
		},

        // Expand first-level nodes only for selected entries
		onExpandFirstLevelForSelection: function() {
			const oTreeTable = this.byId("TreeTableBasic");
			oTreeTable.expand(oTreeTable.getSelectedIndices());
		},

        // Expand all levels recursively for selected nodes
        onExpandAllevelsForSelection: function() {
            const oTreeTable = this.byId("TreeTableBasic");
            oTreeTable.setBusyIndicatorDelay(0).setBusy(true);

            const aSelectedIndices = oTreeTable.getSelectedIndices().sort((a, b) => b - a);
		
			// Use a chain of promises to execute the expansion sequentially
			let chain = Promise.resolve();
		
			aSelectedIndices.forEach(function (iIndex) {
				chain = chain.then(function () {
					return this._expandRecursive(oTreeTable, iIndex); // Return a promise from _expandRecursive
				}.bind(this));
			}.bind(this));
		
			chain.then(function () {
				console.log("All selected nodes and their children have been expanded.");
			}).catch(function (error) {
				console.error("Error expanding nodes:", error);
			}).finally(function () {
				oTreeTable.setBusy(false);
			});
		},
		
        /**
         * Recursive function to expand a node and all of its children.
         * @param {sap.ui.table.TreeTable} oTreeTable - The TreeTable instance
         * @param {int} iIndex - Index of the node to expand
         * @returns {Promise}
         */
		_expandRecursive: function (oTreeTable, iIndex) {
			oTreeTable.expand(iIndex);
		
			const oContext = oTreeTable.getContextByIndex(iIndex);
			if (!oContext) {
				return Promise.resolve();
			}
		
			const iChildCount = oTreeTable.getBinding("rows").getChildCount(oContext);
			let chain = Promise.resolve();
		
			// Process child nodes in reverse order
			for (let i = iChildCount - 1; i >= 0; i--) {
				chain = chain.then(function () {
					const iChildIndex = iIndex + 1 + i;
					return this._asyncDelay(0) // Delay using promises
						.then(() => this._expandRecursive(oTreeTable, iChildIndex));
				}.bind(this));
			}
		
			return chain; // Return the promise chain
		},
		
		/**
         * Helper function to introduce async delay
         * @param {int} ms - delay in milliseconds
         * @returns {Promise}
         */
		_asyncDelay: function (ms) {
			return new Promise(function (resolve) {
				setTimeout(resolve, ms);
			});
		}
    });
});