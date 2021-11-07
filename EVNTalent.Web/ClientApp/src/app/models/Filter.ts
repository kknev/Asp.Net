import { Validators } from "@angular/forms"

export function FilterForm() {
  return {
    'name': [null, Validators.required],
    'department': ["Select...", Validators.required],
    'education': [null, Validators.required],
    'score': [null, Validators.required],
    'arrowScore': ["Current", Validators.required],
    'birthYaer': [null, Validators.required],
    'arrowBirth': ["Current", Validators.required],

    'nameSort': [null, Validators.required],
    'departmentSort': [null, Validators.required],
    'educationSort': [null, Validators.required],
    'scoreSort': [null, Validators.required],
    'birthYearSort': [null, Validators.required],

  }
}

export function FilterResult(data) {

  data['department'] = data['department'] == "Select..."
    ? null
    : data['department'];

  data['arrowScore'] = data['arrowScore'] == "Current"
    ? null
    : data['arrowScore'];

  data['arrowBirth'] = data['arrowBirth'] == "Current"
    ? null
    : data['arrowBirth'];

  let _filterResult = Object.entries(data)
    .filter(([k, v]) => v != null)
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
  return _filterResult;
}