import React from 'react';

import * as HX from '../../../lib/HX';

import theme from '../../core/theme';
import '../../core/theme.css';

const numericFields = ['numeric_input', 'numeric_calc', 'numeric_decimal'];
const percentFields = ['percent_input', 'percent_calc'];
const textFields = ['text_input', 'text_calc'];
const dropdownFields = ['dropdown', 'dropdown_unordered'];
const dateFields = ['date_input'];
const sugSelFields = ['sug_sel_row_input', 'sug_sel_row_calc'];
const firstTableFields = [
  'numeric_input',
  'numeric_calc',
  'numeric_decimal',
  'percent_input',
  'percent_calc',
];
const secondTableFields = [
  'text_input',
  'text_calc',
  'dropdown',
  'dropdown_unordered',
  'date_input',
];

function ExampleModel(props) {
  return (
    <HX.Model
      modelName="Example Model"
      apolloClient={props.apolloClient}
      modelId={props.modelId}
      modelInstanceId={props.modelInstanceId}
      restoreLastSession={props.restoreLastSession}
      store={props.store}
      dataDict={props.dataDict}
      theme={theme}
    >
      <HX.Pane>
        <HX.InputGrid title="Numeric Example" fields={numericFields} />
        <HX.InputGrid title="Percent Example" fields={percentFields} stretch />
      </HX.Pane>

      <HX.Pane>
        <HX.InputGrid title="Text Example" fields={textFields} />
        <HX.InputGrid title="Dropdown Example" fields={dropdownFields} />
      </HX.Pane>

      <HX.Pane>
        <HX.InputGrid title="Date Example" fields={dateFields} />
      </HX.Pane>

      <HX.Pane>
        <HX.SugSel title="SugSel Example" fields={sugSelFields} />
      </HX.Pane>

      <HX.Pane>
        <HX.Table
          title="Table Example 1"
          rept="layers"
          fields={firstTableFields}
        />
      </HX.Pane>

      <HX.Pane>
        <HX.Table
          title="Table Example 2"
          rept="layers"
          fields={secondTableFields}
        />
      </HX.Pane>
    </HX.Model>
  );
}

export default ExampleModel;
