#!/bin/bash

if [[ "$BRANCH" == "staging" || "$BRANCH" == "main"  ]] ; then
  # Proceed with the build
  echo "✅ - Build can proceed"
  exit 1;

else
  # Don't build
  echo "🛑 - Build cancelled"
  exit 0;
fi