Virtual Memory Glossaries
=========================

- **EFER**: (Extended Feature Enable Register)
- **LME**: (Long Mode Enable) <br>
           Bit 8 in `IA32_EFER` MSR.
           If set, 64-bit long mode (i.e., IA-32e) is enabled.
- **MMU**: (Memory Management Unit)
- **MSR**: (Model-Specific Register)
- **PAE**: (Physical Address Extension) <br>
           Bit 5 in CR4 control register.
- **PD**: (Page Directory) <br>
          The 3rd level of the 4-level x86\_64 paging structure.
          An PD entry (PDE) points to a page table (PT).
- **PDPT**: (Page Directory Pointer Table) <br>
            The 2nd level of the 4-level x86\_64 paging structure.
            An PDPT entry (PDPTE) points to a PD table.
- **PFN**: (Page Frame Number)
- **PG**: Bit 31 in CR0 control register.
          If set, paging is enabled.
- **PS**: (Page Size) <br>
          Bit 7 in PML4/PDPT/PD entries.
          If this bit is set, then the current entry represents the physical page.
          Otherwise, the entry points to the next layer of paging structure.
- **PT**: (Page Table) <br>
          The last level of the 4-level x86\_64 paging structure, containing page table entries (PTEs).
- **VM**: (Virtual Memory)
