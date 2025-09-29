/*global QUnit*/

sap.ui.define([
	"openui5/treetable/recursiveexpand/controller/CatalogHierarchy.controller"
], function (Controller) {
	"use strict";

	QUnit.module("CatalogHierarchy Controller");

	QUnit.test("I should test the CatalogHierarchy controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
