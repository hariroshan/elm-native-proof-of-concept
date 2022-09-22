module Page exposing (Page)

import Html exposing (Html)
import Layout exposing (Layout)


type Page msg
    = Page (Html msg)


page : Layout -> Page msg
page =
    Debug.todo "Impl page"
    