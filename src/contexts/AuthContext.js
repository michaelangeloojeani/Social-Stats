import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Configure axios
axios.defaults.baseURL = 'http://localhost:5000'; // Your backend URL
axios.defaults.withCredentials = true; // Important for cookies/sessions