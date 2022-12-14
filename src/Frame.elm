module Frame exposing (Frame, asElement, frame, root)

import Html exposing (Attribute, Html)
import Page exposing (Page)


type Frame msg
    = Frame (Html msg)


frame : { a | next : Maybe page, current : page, history : List page } -> List ( page, { a | next : Maybe page, current : page, history : List page } -> Page msg ) -> List (Attribute msg) -> Frame msg
frame model pages attrs =
    Frame
        (Html.node "x-frame"
            attrs
            (model.history
                |> List.foldl
                    (\next acc ->
                        pages
                            |> getPage next model
                            |> Maybe.map (\x -> x :: acc)
                            |> Maybe.withDefault acc
                    )
                    []
            )
         -- ([ pages
         --     |> getPage model.current model
         --  , model.next
         --     |> Maybe.map
         --         (\next ->
         --             pages
         --                 |> getPage next model
         --         )
         --     |> Maybe.withDefault []
         --  ]
         --     |> List.concat
         -- )
        )


getPage : a -> b -> List ( a, b -> Page msg ) -> Maybe (Html msg)
getPage target model pages =
    pages
        |> findInList target Tuple.first Nothing
        |> Maybe.map
            (\( _, fx ) ->
                model
                    |> fx
                    |> Page.unwrap
            )


findInList : b -> (a -> b) -> Maybe a -> List a -> Maybe a
findInList target toItem acc ls =
    case ls of
        [] ->
            acc

        h :: r ->
            if target == toItem h then
                Just h

            else
                findInList target toItem acc r


root : Frame msg -> Html msg
root (Frame e) =
    e


asElement : Frame msg -> Html msg
asElement =
    root
