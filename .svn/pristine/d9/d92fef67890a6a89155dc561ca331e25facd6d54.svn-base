# Python module providing a high-level interface to the KCWI instrument.

override SYSNAM = kss/kcwi/scripts/python/KCWIConfManager/static/css
override VERNUM = 1.0

RELDAT = $(wildcard *.css)
DATSUB = KCWIConfManager/static/css


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
