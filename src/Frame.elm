module Frame exposing (..)

import Html exposing (Html)
import Page exposing (Page)


type Frame msg
    = Frame (Html msg)


frame : Page msg -> Frame msg
frame =
    Debug.todo "Impl Frame"
