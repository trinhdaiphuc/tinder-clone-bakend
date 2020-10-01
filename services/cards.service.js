"use strict";

const DbMixin = require("../mixins/db.mixin");
const mongoose = require("mongoose");

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "cards",
	// version: 1

	/**
	 * Mixins
	 */
	mixins: [DbMixin("cards")],

	model: mongoose.model(
		"cards",
		mongoose.Schema({
			name: { type: String },
			imgUrl: { type: String },
		})
	),

	/**
	 * Settings
	 */
	settings: {
		// Available fields in the responses
		fields: ["_id", "name", "imgUrl"],

		// Validator for the `create` & `insert` actions.
		entityValidator: {
			name: "string|min:3",
			imgUrl: "string",
		},
	},

	/**
	 * Action Hooks
	 */
	hooks: {
		before: {
			/**
			 * Register a before hook for the `create` action.
			 * It sets a default value for the quantity field.
			 *
			 * @param {Context} ctx
			 */
			create(ctx) {
				ctx.params.imgUrl = "";
			},
		},
	},

	/**
	 * Actions
	 */
	actions: {
		/**
		 * The "moleculer-db" mixin registers the following actions:
		 *  - list
		 *  - find
		 *  - count
		 *  - create
		 *  - insert
		 *  - update
		 *  - remove
		 */

	},

	/**
	 * Methods
	 */
	methods: {
		/**
		 * Loading sample data to the collection.
		 * It is called in the DB.mixin after the database
		 * connection establishing & the collection is empty.
		 */
		async seedDB() {
			await this.adapter.insertMany([
				{ name: "Elmon Musk", imgUrl: "./020.jpg" },
				{ name: "Elsa Mila", imgUrl: "./387.jpg" },
			]);
		},
	},

	/**
	 * Fired after database connection establishing.
	 */
	async afterConnected() {
		// await this.adapter.collection.createIndex({ name: 1 });
	},
};
