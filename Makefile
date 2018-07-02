
override SYSNAM = kss/kcwi/scripts/python/Keck1ConfManager
override VERNUM = 1.0

SUBST_STRICT = True

DIRS = static templates

RELBIN = kcwiConfManager
FILES = $(RELBIN)


################################################################################
# KROOT boilerplate:
# Include general make rules, using default values for the key environment
# variables if they are not already set.

ifndef KROOT
	KROOT = /kroot
endif

ifndef RELNAM
	RELNAM = default
endif

ifndef RELDIR
	RELDIR = $(KROOT)/rel/$(RELNAM)
endif

include $(KROOT)/etc/config.mk
################################################################################
