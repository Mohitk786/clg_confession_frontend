"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FormField({
    label,
    name,
    type = "text",
    placeholder,
    required = false,
    optionalText,
    error,
    value,
    onChange,
  }: any) {
    return (
      <div className="space-y-1">
        <Label htmlFor={name}>
          {label}{" "}
          {required ? <span className="text-red-500">*</span> : optionalText && (
            <span className="text-gray-500 font-normal">({optionalText})</span>
          )}
        </Label>
        <Input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`h-12 border ${
            error ? "border-red-500 focus:border-red-500" : "border-gray-200"
          } focus:border-purple-500 focus:ring-purple-500`}
        />
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    );
  }
  