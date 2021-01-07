DragonFly Bootstrap
===================

BIOS
----
![BIOS-MBR-boot](https://raw.githubusercontent.com/Moritz-Systems/moritz_staticDir/master/Loading_MBR_2_gxwj0i.svg)

Kernel
------
The Kernel is an **ELF** file:

```sh
% file /boot/kernel/kernel
/boot/kernel/kernel: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /red/herring, with debug_info, not stripped
```

TODO/OP: what's the interpreter `/red/herring` ??

Determine the entry point of the Kernel:

```sh
% readelf -h /boot/kernel/kernel
ELF Header:
  Magic:   7f 45 4c 46 02 01 01 00 00 00 00 00 00 00 00 00 
  Class:                             ELF64
  Data:                              2's complement, little endian
  Version:                           1 (current)
  OS/ABI:                            UNIX - System V
  ABI Version:                       0
  Type:                              EXEC (Executable file)
  Machine:                           Advanced Micro Devices X86-64
  Version:                           0x1
  Entry point address:               0xffffffff802aae40                     <<<--- entry point address
  Start of program headers:          64 (bytes into file)
  Start of section headers:          130859872 (bytes into file)
  Flags:                             0x0
  Size of this header:               64 (bytes)
  Size of program headers:           56 (bytes)
  Number of program headers:         5
  Size of section headers:           64 (bytes)
  Number of section headers:         53
  Section header string table index: 50
  
% readelf --syms /boot/kernel/kernel | grep -i ffffffff802aae40
     2: ffffffff802aae40     0 FUNC    GLOBAL DEFAULT    5 btext
 29074: ffffffff802aae40     0 FUNC    GLOBAL DEFAULT    5 btext            <<<--- entry function name
```

So the entry function is called `btext`, which locates in the machine-dependent assembly code
[`locore.s`](https://github.com/DragonFlyBSD/DragonFlyBSD/blob/master/sys/platform/pc64/x86_64/locore.s).

```asm
NON_GPROF_ENTRY(btext)

	/* Tell the bios to warmboot next time */
	movw	$0x1234,0x472

	/* Don't trust what the loader gives for rflags. */
	pushq	$PSL_KERNEL
	popfq

	/* Find the metadata pointers before we lose them */
	movq	%rsp, %rbp
	movl	4(%rbp),%edi		/* modulep (arg 1) */
	movl	8(%rbp),%esi		/* kernend (arg 2) */

	/* Get onto a stack that we can trust - there is no going back now. */
	movq	$bootstack,%rsp
	xorl	%ebp, %ebp

	call	hammer_time		/* set up cpu for unix operation */
	movq	%rax,%rsp		/* set up kstack for mi_startup() */
	call	mi_startup		/* autoconfiguration, mountroot etc */
0:	hlt
	jmp	0b
```

References
----------
* [Before the BSD Kernel starts: Part One on AMD64](https://www.moritz.systems/blog/before-the-bsd-kernel-starts-part-one-on-amd64/)
