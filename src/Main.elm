module Main exposing (main)

import Browser
import Frame exposing (frame)
import Html exposing (..)
import Html.Attributes as Attrs
import Html.Events as Event
import Json.Decode as D
import Layout exposing (stackLayout)
import Page exposing (page)


main : Program () Model Msg
main =
    Browser.sandbox
        { init = init
        , view = view
        , update = update
        }


type NavPage
    = Counter
    | Details


type alias Model =
    { count : Int
    , current : NavPage
    , next : Maybe NavPage
    , history : List NavPage
    }


init : Model
init =
    let
        _ =
            Debug.log "HEllo from ELM" "World"
    in
    { count = 0, current = Counter, history = [ Counter ], next = Nothing }


type Msg
    = Inc
    | Dec
    | GoToDetails
    | Created NavPage
    | UnLoaded



-- | UnUnLoaded


update : Msg -> Model -> Model
update msg model =
    case msg of
        Dec ->
            { model | count = model.count - 1 }

        Inc ->
            { model | count = model.count + 1 }

        GoToDetails ->
            { model | history = Details :: model.history, next = Just Details }

        Created navPage ->
            { model | current = navPage }

        UnLoaded ->
            { model
                | history =
                    case model.next of
                        Nothing ->
                            model.history |> List.drop 1

                        Just _ ->
                            model.history
                , next = Nothing
            }


button : String -> msg -> Html msg
button buttonText msg =
    Html.node "x-button"
        [ Attrs.attribute "text" buttonText

        -- , Attrs.attribute "style" "color:blue"
        , Attrs.class "-primary"
        , Event.on "tap" (D.succeed msg)
        ]
        []


label : List (Attribute msg) -> List (Html msg) -> Html msg
label attrs children =
    Html.node "x-label" attrs children


counterPage : Model -> Page.Page Msg
counterPage model =
    page [ Event.on "created" (D.succeed (Created Counter)), Event.on "unloaded" (D.succeed UnLoaded) ]
        (stackLayout
            []
            [ if model.count < 5 then
                button "Increment" Inc

              else
                Html.text ""
            , label [ Attrs.attribute "text" (model.count |> String.fromInt) ] []
            , button "Decrement" Dec
            , button "Details Page" GoToDetails
            ]
        )


detailsPage : Model -> Page.Page Msg
detailsPage _ =
    page [ Event.on "created" (D.succeed (Created Details)), Event.on "unloaded" (D.succeed UnLoaded) ]
        (stackLayout []
            [ label [ Attrs.attribute "text" "DETAILS" ] [] ]
        )


view : Model -> Html Msg
view model =
    frame model
        [ ( Counter, counterPage )
        , ( Details, detailsPage )
        ]
        []
        |> Frame.root
