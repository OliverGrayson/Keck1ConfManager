# Python module providing a high-level interface to the KCWI instrument.

override SYSNAM = kss/kcwi/scripts/python/KCWIConfManager/static/js
override VERNUM = 1.0

RELDAT = $(wildcard *.js)
DATSUB = KCWIConfManager/static/js


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
