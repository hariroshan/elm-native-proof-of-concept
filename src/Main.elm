module Main exposing (main)

import Browser
import Html exposing (..)


main : Program () Model Msg
main =
    Browser.sandbox
        { init = init
        , view = view
        , update = update
        }


type alias Model =
    { count : Int
    }


init : Model
init =
    let
        _ =
            Debug.log "HEllo from ELM" "World"
    in
    { count = 0 }


type Msg
    = Inc
    | Dec


update : Msg -> Model -> Model
update msg model =
    case msg of
        Dec ->
            { model | count = model.count - 1 }

        Inc ->
            { model | count = model.count + 1 }


view : Model -> Html Msg
view _ =
    Html.node "x-frame"
        []
        [ Html.node "x-page"
            []
            [ Html.node "x-label" [] []
            ]
        ]
