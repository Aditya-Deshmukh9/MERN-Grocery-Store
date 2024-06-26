import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";

function Profile({ getSignOut }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <CircleUserRound
          className="bg-green-100 
            md:p-2 rounded-full cursor-pointer
             text-primary h-6 w-6 md:h-12 md:w-12"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/order">My Orders</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => getSignOut()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Profile;
