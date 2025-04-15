"use client"

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export const UserButton = () => {
  return (
      <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="outline-none relative">
              <Avatar className="size-10 hover:opacity-75 transition">
                  <AvatarImage />
                  <AvatarFallback>

                  </AvatarFallback>
              </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" side="right" className="w-60">
              <DropdownMenuItem>

              </DropdownMenuItem>
          </DropdownMenuContent>
      </DropdownMenu>
  )
}