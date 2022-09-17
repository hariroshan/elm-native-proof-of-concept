module Main exposing (main)

import Browser
import Html exposing (..)
import Html.Attributes as Attrs
import Html.Events as Event


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
view model =
    Html.node "x-frame"
        [ Attrs.attribute "id" "root" ]
        [ Html.node "x-page"
            []
            [ Html.node "x-stack-layout"
                []
                [ Html.node "x-button" [ Attrs.attribute "text" "Increment", Attrs.attribute "style" "color:blue" ] []
                , Html.node "x-label" [ Attrs.attribute "text" (model.count |> String.fromInt) ] []
                , Html.node "x-button" [ Attrs.attribute "text" "Decrement" ] []
                ]
            ]
        ]
