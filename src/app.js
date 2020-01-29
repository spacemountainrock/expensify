import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import "react-dates/initialize";
import { addExpense } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses";
import "../node_modules/normalize.css/normalize.css";
import "react-dates/lib/css/_datepicker.css";
import "./styles/style.scss";

const store = configureStore();

// const state = store.getState();
// const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
// console.log(visibleExpenses);

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));
