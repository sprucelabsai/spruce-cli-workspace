# Commands

Commands are special. They are loaded off the file system.

They are meant to handle user interactions and pass them to things that do work (Components, Generators, etc.)

Commands and components are the only places you should be asking for input (using the TerminalService)
