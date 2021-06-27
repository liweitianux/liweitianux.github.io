BSD Glossaries
==============

- **BSD**: (Berkeley Software Distribution)
- **MD**: (Machine Dependent)
- **MI**: (Machine Independent)
- **pmap**: `struct` (physical mapping) <br>
            The MD part of the VM subsystem.
            It provides functionalies:
            (1) create virtual to physical mappings;
            (2) invalidate a mapping to a physical page;
            (3) modify protection attributes of a mapping;
            (4) track page access and modification.
- **VM**: (Virtual Memory)
- **vm_map_entry**: `struct`
- **vm_object**: `struct`
- **vm_page**: `struct`
- **vmspace**: `struct` (virtual address space) <br>
               Represent the virtual address space of a process provided by the VM subsystem.
               Each `vmspace` has an embeded `pmap`.
               The page tables are the MD representation of the `vmspace`,
               and the processor's `CR3` control register points to the root of the page tables.

Kernel
------
- **AST**: (Asynchronous System Trap)
