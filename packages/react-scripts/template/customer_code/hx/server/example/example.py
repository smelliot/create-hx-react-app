
import operator
from collections import OrderedDict
import requests

from HXCore.HXLookup import lookup
from HXCore.HXSugSel import get_sugsel_schema, get_selected
from Models.HXLibrary import lognorm_ilf, riebesell_ilf, ilf_for_layer
from Models.HXCoreData import add_core_data, HXCore, ClientCore


def get_sample_data():
    return [
        OrderedDict([
            ("numeric_input", 0),
            ("numeric_calc", 123456789),
            ("numeric_decimal", 5.4321),

            ("percent_input", 0.0),
            ("percent_calc", 0.56789),

            ("text_input", "Some Text"),
            ("text_calc", "Some More Text"),

            ("dropdown", "Option 1"),
            ("dropdown_unordered", "Y"),

            ("date_input", "2018-01-01"),

            ("sug_sel_row_input", {
                "key": "Option 1",
                "suggested": -0.3,
                "override": -0.2,
                "selected": -0.2,
                "comment": "Some Comment"
            }),
            ("sug_sel_row_calc", {
                "key": 12345,
                "suggested": -0.1,
                "override": None,
                "selected": -0.1,
                "comment": "Some Other Comment"
            }),

            ("table", [
                OrderedDict([
                    ("numeric_input", 0),
                    ("numeric_calc", 123456789),
                    ("numeric_decimal", 5.4321),
                    ("percent_input", 0.0),
                    ("percent_calc", 0.56789),
                    ("text_input", "Some Text"),
                    ("text_calc", "Some More Text"),
                    ("dropdown", "Option 1"),
                    ("dropdown_unordered", "Y"),
                    ("date_input", "2018-01-01")
                ]),
                OrderedDict([
                    ("numeric_input", 10),
                    ("numeric_calc", 987654321),
                    ("numeric_decimal", 1.2345),
                    ("percent_input", 0.0),
                    ("percent_calc", 0.98765),
                    ("text_input", "Text Some"),
                    ("text_calc", "Text More Some"),
                    ("dropdown", "Option 3"),
                    ("dropdown_unordered", "B"),
                    ("date_input", "2018-12-31")
                ])
            ]),
        ])
    ]


def get_datadict():

    datadict_layer = [
        {"name": "numeric_input", "type": "float", "default": None},
        {"name": "numeric_calc", "type": "float", "default": 0},
        {"name": "numeric_decimal", "type": "float", "default": 0},
        {"name": "percent_input", "type": "float", "default": None},
        {"name": "percent_calc", "type": "float", "default": 0},

        {"name": "text_input", "type": "str", "default": ""},
        {"name": "text_calc", "type": "str", "default": ""},
        {"name": "dropdown", "type": "str", "default": "Option 1"},
        {"name": "dropdown_unordered", "type": "str", "default": "Z"},
        {"name": "date_input", "type": "str", "default": ""},
    ]

    datadict_layers = {"name": "layer",
                       "type": "dict", "children": datadict_layer}

    datadict_root = [
        {"name": "numeric_input", "type": "float", "default": None},
        {"name": "numeric_calc", "type": "float", "default": 0},
        {"name": "numeric_decimal", "type": "float", "default": 0},

        {"name": "percent_input", "type": "float", "default": None},
        {"name": "percent_calc", "type": "float", "default": 0},

        {"name": "text_input", "type": "str", "default": ""},
        {"name": "text_calc", "type": "str", "default": ""},

        {"name": "dropdown", "type": "str", "default": "Option 1"},
        {"name": "dropdown_unordered", "type": "str", "default": "Z"},

        {"name": "date_input", "type": "str", "default": ""},

        {"name": "sug_sel_row_input", "type": "dict",
            "children": get_sugsel_schema("str", "As Expected", "float")},
        {"name": "sug_sel_row_calc", "type": "dict",
            "children": get_sugsel_schema("float", 0, "float")},

        {"name": "layers", "type": "list", "children": datadict_layers, "min_elements": 1, "max_elements": 3,
         "default_elements": 1},

    ]

    datadict = {"name": "root", "type": "dict", "children": datadict_root}

    return datadict


def get_algorithms():

    def rating_algorithm(hxd, params):
        return None

    algorithms = {
        "rating_algorithm": rating_algorithm,
    }
    return algorithms


def get_parameters():
    params = {
        "base_rate": 0.01,
        "base_model_ulr": 0.7,
        "industry": {
            "match_operator": operator.eq,
            "keys": ["Manufacturing", "Distribution", "Operations"],
            "values": [16, 2, 1]
        },
        "rf_loss_history": {
            "match_operator": operator.eq,
            "keys": ["Clean", "Good", "As Expected", "Bad", "Terrible"],
            "values": [-0.3, -0.1, 0, 0.1, 0.3],
        },
        "rf_territory": {
            "match_operator": operator.eq,
            "keys": ["UK", "Canada", "Sri Lanka"],
            "values": [0, 0.2, -0.5],
        },
        "rf_size_of_risk": {
            "match_operator": operator.ge,
            "keys": [1000000, 150000, 10000, 0],
            "values": [-0.8, -0.3, 0, 0.2]
        },
        "ilf_riebesell": {
            "z": 0.2,
            "base_limit": 1000000,
        },
        "ilf_lognorm": {
            "mu": 13.4617,
            "sigma": 0.5545,
            "base_limit": 1000000,
        },
        "deductible": {
            "match_operator": operator.ge,
            "keys": [50000, 25000, 10000, 0],
            "values": [-0.1, -0.05, 0, 0.1]
        },
        "inflation_index": {
            "match_operator": operator.eq,
            "keys": ["UK", "Argentina", "Australia", "Canada", "Euro Area", "France", "Germany", "Italy", "Japan",
                     "Russia", "Switzerland", "USA"],
            "values": ["RATEINF/INFLATION_GBR", "RATEINF/INFLATION_ARG", "RATEINF/INFLATION_AUS",
                       "RATEINF/INFLATION_CAN", "RATEINF/INFLATION_EUR", "RATEINF/INFLATION_FRA",
                       "RATEINF/INFLATION_DEU", "RATEINF/INFLATION_ITA", "RATEINF/INFLATION_JPN",
                       "RATEINF/INFLATION_RUS", "RATEINF/INFLATION_CHE", "RATEINF/INFLATION_USA"]
        },
        "default_inflation_value": {
            "match_operator": operator.eq,
            "keys": ["UK", "Argentina", "Australia", "Canada", "Euro Area", "France", "Germany", "Italy", "Japan",
                     "Russia", "Switzerland", "USA"],
            "values": [0.03, 0.1054, 0.019, 0.019, 0.0135, 0.0119, 0.017, 0.010, 0.011, 0.025, 0.008, 0.02109]
        },
        "default_inflation_date": {
            "match_operator": operator.eq,
            "keys": ["UK", "Argentina", "Australia", "Canada", "Euro Area", "France", "Germany", "Italy", "Japan",
                     "Russia", "Switzerland", "USA"],
            "values": ["2017-12-31", "2013-12-31", "2017-12-31", "2017-12-31", "2017-12-31", "2017-12-31", "2017-12-31",
                       "2017-12-31", "2017-12-31", "2017-12-31", "2017-12-31", "2017-12-31"]
        }

    }
    return params


model_data = {
    "datadict": get_datadict(),
    "params": get_parameters(),
    "sample_data": get_sample_data(),
    "algorithms": get_algorithms()
}

add_core_data(model_data, HXCore)
add_core_data(model_data, ClientCore)
