import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({ ...props }) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    }

    return (
        <div className="relative">
            <Input {...props} id="password" type={showPassword ? "text" : "password"} required/>
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
            >
                {
                    showPassword
                    ? <Eye className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    : <EyeOff className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                }
            </Button>
        </div>
    )
};
