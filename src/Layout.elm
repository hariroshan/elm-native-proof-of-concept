module Layout exposing (Layout, stackLayout, asElement)

import Html exposing (Attribute, Html)


type Layout msg
    = Layout (Html msg)


stackLayout : List (Attribute msg) -> List (Html msg) -> Layout msg
stackLayout attrs children =
    Layout (Html.node "x-stack-layout" attrs children)


asElement : Layout msg -> Html msg
asElement (Layout e) =
    e
