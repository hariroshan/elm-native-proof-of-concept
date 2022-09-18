module Main exposing (main)

import Browser
import Html exposing (..)
import Html.Attributes as Attrs
import Html.Events as Event
import Json.Decode as D


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


button : String -> msg -> Html msg
button buttonText msg =
    Html.node "x-button"
        [ Attrs.attribute "text" buttonText
        , Attrs.attribute "style" "color:blue"
        , Event.on "tap" (D.succeed msg)
        ]
        []


stackLayout : List (Attribute msg) -> List (Html msg) -> Html msg
stackLayout attrs children =
    Html.node "x-stack-layout" attrs children


view : Model -> Html Msg
view model =
    Html.node "x-frame"
        []
        [ Html.node "x-page"
            []
            [ stackLayout
                []
                [ stackLayout
                    []
                    [ if model.count < 5 then
                        button "Increment" Inc

                      else
                        Html.text ""
                    , Html.node "x-label" [ Attrs.attribute "text" (model.count |> String.fromInt) ] []
                    , button "Decrement" Dec
                    ]
                ]
            ]
        ]
