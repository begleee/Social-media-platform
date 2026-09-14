import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#components/ui/tabs"
import { useLocation, useNavigate } from 'react-router'
import { ModeToggle } from '#components/mode-toggle'

export default function ButtomTabBar() {
    const navigate = useNavigate();

    return (
    <Tabs>
        <TabsList defaultValue="/">
            <TabsTrigger value="/" onClick={() => navigate("/feed")}>
                    Feed
            </TabsTrigger>
            <TabsTrigger value="/about" onClick={() => navigate("/about")}>
                    About
            </TabsTrigger>
            <TabsTrigger value="/profile" onClick={() => navigate("/profile")}>
                    Profile
            </TabsTrigger>
        <ModeToggle/>
        </TabsList>
    </Tabs>
    )
}
