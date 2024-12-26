"use client";
import React from 'react';
import {
    Card,
    Button,
    Tooltip
} from "@nextui-org/react";

import { FaHome, FaSearch } from "react-icons/fa";
import { GiPartyFlags } from "react-icons/gi";
import { MdBusinessCenter, MdRoomService } from "react-icons/md";
import { redirect } from 'next/navigation';

export const SidebarDashboard = () => {
    const [selected, setSelected] = React.useState("home");

    const menuItems = [
        { key: "search", icon: <FaSearch />, href: "/dashboard/search" },
        { key: "home", icon: <FaHome />, href: "/dashboard" },
        { key: "events", icon: <GiPartyFlags />, href: "/dashboard/events" },
        { key: "services", icon: <MdRoomService />, href: "/dashboard/services" },
        { key: "business", icon: <MdBusinessCenter />, href: "/dashboard/business" },
    ];

    return (
        <Card className="sticky top-0 h-screen w-16 flex flex-col items-center gap-2 py-4 px-2 bg-black">
            {menuItems.map((item) => (
                <Tooltip
                    key={item.key}
                    content={item.key.charAt(0).toUpperCase() + item.key.slice(1)}
                    placement="right"
                    className="capitalize"
                >
                    <Button
                        className={`w-12 h-12 min-w-0 p-0 bg-transparent hover:bg-zinc-800 ${selected === item.key ? "bg-zinc-800" : ""
                            }`}
                        onClick={() => { setSelected(item.key) 
                            redirect(item.href);
                        }}
                        isIconOnly
                        aria-label={item.key}
                    >
                        <div className={`text-white ${selected === item.key ? "text-blue-500" : ""
                            }`}>
                            {item.icon}
                        </div>
                    </Button>
                </Tooltip>
            ))}
        </Card>
    );
};
