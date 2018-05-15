// This is a data dictionary, so these variables won't be used here
/* eslint no-unused-vars: 0 */

// TO DO: Think about visibility props

const dataDictExample = {
  // Template data dictionary entries for children of compound structures (e.g. sugSels) - N.B. these are reserved words for dictionary items

  // TO DO: Pull these out into a separate core dictionary
  _sugSel_selected: {
    structure: 'atomic',
    source: 'input',
    type: 'numeric',
    format: '0.0%',
  },
  _sugSel_suggested: {
    structure: 'atomic',
    source: 'calc',
    type: 'numeric',
    format: '0.0%',
  },
  _sugSel_comment: {
    structure: 'atomic',
    source: 'input',
    type: 'text',
  },

  // Key stats header fields
  _total_model_premium: {
    structure: 'atomic',
    label: 'Model Premium',
    source: 'calc',
    type: 'numeric',
    format: '0,0',
  },
  _total_charged_premium: {
    structure: 'atomic',
    label: 'Charged Premium',
    source: 'input',
    type: 'numeric',
    format: '0,0',
  },
  _total_ulr: {
    structure: 'atomic',
    label: 'ULR',
    source: 'calc',
    type: 'numeric',
    format: '0.0%',
  },
  _total_adjustments: {
    structure: 'atomic',
    label: 'Total Adjustments',
    source: 'calc',
    type: 'numeric',
    format: '0.0%',
  },
  _status: {
    structure: 'atomic',
    label: 'Status',
    source: 'calc',
    type: 'text',
  },

  // Atomic data
  numeric_input: {
    structure: 'atomic',
    label: 'Input Numeric',
    source: 'input',
    type: 'numeric',
    format: '0,0',
  },
  numeric_calc: {
    structure: 'atomic',
    label: 'Calculated Numeric',
    source: 'calc',
    type: 'numeric',
    format: '0,0',
  },
  numeric_decimal: {
    structure: 'atomic',
    label: 'Decimal Numeric',
    source: 'calc',
    type: 'numeric',
    format: '0.00',
  },
  percent_input: {
    structure: 'atomic',
    label: 'Input Percentage',
    source: 'calc',
    type: 'numeric',
    format: '0.00[00]%',
  },
  percent_calc: {
    structure: 'atomic',
    label: 'Calculated Percentage',
    source: 'calc',
    type: 'numeric',
    format: '0.00[00]%',
  },
  text_input: {
    structure: 'atomic',
    source: 'input',
    label: 'Input Text',
    type: 'text',
  },
  text_calc: {
    structure: 'atomic',
    label: 'Calculated Text',
    source: 'calc',
    type: 'text',
  },
  dropdown: {
    structure: 'atomic',
    label: 'Dropdown',
    source: 'input',
    type: 'factor',
    levels: ['Option 1', 'Option 2', 'Option 3'],
  },
  dropdown_unordered: {
    structure: 'atomic',
    source: 'calc',
    label: 'Unordered Dropdown',
    type: 'factor',
    levels: ['Z', 'A', 'Y', 'C', 'B'],
    ordered: 'false',
  },
  date_input: {
    structure: 'atomic',
    label: 'Input Date',
    source: 'input',
    type: 'date',
  },

  // sugSels
  sug_sel_row_input: {
    structure: 'sugSel',
    label: 'Input Row',
    source: 'input',
    type: 'factor',
    levels: ['Option 1', 'Option 2', 'Option 3'],
  },
  sug_sel_row_calc: {
    structure: 'sugSel',
    label: 'Input Calc',
    source: 'calc',
    type: 'numeric',
    format: '0,0',
  },
  // Repeating structures (one level deep) - these are composed from atomic items above
  // ORIGINAL THOUGHTS: columns is a set of column parameters that represents the encapsulating data structure (the "iterable" structure that actuaries would want to loop through for calculations or analysis). This will also allow us to have multiple repeat rows by 'wrapping' fields that overrun the column specification to the next row
  // N.B. the columns are not explicity labelled, formatted or typed - they inherit from their repeats and fixedData. We'll need to error trap this neatly! This is potentially misleading as we will need to store data items in them and reference them, e.g. exps.expRegions - however this is a data issue, not a view one
  // CURRENT IMPLEMENTATION: this does away with the complexities of fixed data
  layers: {
    structure: 'repeat',
    source: 'repeat',
    columnLabels: [
      'Input Numeric',
      'Calculated Numeric',
      'Decimal Numeric',
      'Input Percentage',
      'Calculated Percentage',
      'Input Text',
      'Calculated Text',
      'Dropdown',
      'Unordered Dropdown',
      'Input Date',
    ],
    columns: [
      'numeric_input',
      'numeric_calc',
      'numeric_decimal',
      'percent_input',
      'percent_calc',
      'text_input',
      'text_calc',
      'dropdown',
      'dropdown_unordered',
      'date_input',
    ],
    repeats: [
      'numericInput',
      'numericCalc',
      'numericDecimal',
      'percentInput',
      'percentCalc',
      'textInput',
      'textCalc',
      'dropDown',
      'dropdownUnordered',
      'dateInput',
    ],
  },
};

export default dataDictExample;
