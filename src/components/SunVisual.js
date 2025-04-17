// File: SunVisual.js

"use client";
import React from "react";

export default function SunVisual({ circumference }) {
  const circumferenceValue = circumference ? circumference.toLocaleString() : null;

  return (
    <div className="sun-container">
      <div className="sun">
        {circumferenceValue && (
          <div className="circumference-text">
            <span>{circumferenceValue} meters</span>
          </div>
        )}
      </div>
      <div className="circumference-ring">
        <svg width="400" height="400" viewBox="0 0 400 400">
          <circle
            cx="200"
            cy="200"
            r="150"
            stroke="white"
            strokeWidth="4"
            fill="none"
            className="circumference-circle"
          />
        </svg>
      </div>
    </div>
  );
}
