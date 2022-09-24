module Page exposing (Page, page, unwrap)

import Html exposing (Attribute, Html)
import Layout exposing (Layout)


type Page msg
    = Page (Html msg)


page : List (Attribute msg) -> Layout msg -> Page msg
page attrs layout =
    Page
        (Html.node "x-page"
            attrs
            [ Layout.asElement layout ]
        )


unwrap : Page msg -> Html msg
unwrap (Page e) =
    e
