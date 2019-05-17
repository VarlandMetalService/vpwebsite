specifications = []
filter_org = null
filter_spec = null
filter_proc = null

Array::unique = ->
  output = {}
  output[@[key]] = @[key] for key in [0...@length]
  value for key, value of output

sortBy = (key, a, b, r) ->
  r = if r then 1 else -1
  return -1*r if a[key] > b[key]
  return +1*r if a[key] < b[key]
  return 0

sortByMultiple = (a, b, keys) ->
  for key in keys
    r = sortBy key, a, b
    if r != 0
      return r
  return 0

add_specification = (org, spec, proc) ->
  this_spec =
    organization: org
    specification: spec
    process: proc
  specifications.push this_spec

build_rows = ->
  rows = []
  available_organizations = []
  available_specifications = []
  available_plating_processes = []
  org_filter_dropdown = $("#vp-specifications-organization-filter")
  spec_filter_dropdown = $("#vp-specifications-specification-filter")
  proc_filter_dropdown = $("#vp-specifications-process-filter")
  org_filter_dropdown.removeClass "d-none"
  spec_filter_dropdown.removeClass "d-none"
  proc_filter_dropdown.removeClass "d-none"
  filter_org = org_filter_dropdown.val()
  filter_spec = spec_filter_dropdown.val()
  filter_proc = proc_filter_dropdown.val()
  if filter_org == ""
    filter_org = null
  if filter_spec == ""
    filter_spec = null
  if filter_proc == ""
    filter_proc = null
  for spec in specifications
    if (!filter_org? || filter_org == spec.organization) && (!filter_spec? || filter_spec == spec.specification) && (!filter_proc? || filter_proc == spec.process)
      available_organizations.push spec.organization
      available_specifications.push spec.specification
      available_plating_processes.push spec.process
      new_row = $("<tr>")
      org_cell = $("<td>").text(spec.organization)
      spec_cell = $("<td>").html("<a href=\"#\">" + spec.specification + "</a>")
      process_cell = $("<td>").text(spec.process)
      new_row.append(org_cell)
      new_row.append(spec_cell)
      new_row.append(process_cell)
      rows.push new_row
  $("#vp-specifications-table").html(rows)
  available_organizations = available_organizations.unique().sort()
  available_specifications = available_specifications.unique().sort()
  available_plating_processes = available_plating_processes.unique().sort()
  blank_org_option = $("<option>").val("").text("")
  blank_spec_option = $("<option>").val("").text("")
  blank_proc_option = $("<option>").val("").text("")
  org_options = [blank_org_option]
  spec_options = [blank_spec_option]
  proc_options = [blank_proc_option]
  for org in available_organizations
    this_option = $("<option>")
    this_option.val(org)
    this_option.text(org)
    org_options.push this_option
  for spec in available_specifications
    this_option = $("<option>")
    this_option.val(spec)
    this_option.text(spec)
    spec_options.push this_option
  for proc in available_plating_processes
    this_option = $("<option>")
    this_option.val(proc)
    this_option.text(proc)
    proc_options.push this_option
  org_filter_dropdown.html(org_options).val(filter_org)
  spec_filter_dropdown.html(spec_options).val(filter_spec)
  proc_filter_dropdown.html(proc_options).val(filter_proc)


$ ->
  add_specification("ASTM", "B841", "Zinc-Nickel Plating")
  add_specification("GM", "GMW3200", "Tin-Zinc Plating")
  add_specification("ASTM", "B545", "Tin Plating")
  add_specification("ASTM", "B633", "Zinc Plating")
  add_specification("ASTM", "B689", "Nickel Plating")
  add_specification("ASTM", "B733", "Electroless Nickel Plating")
  add_specification("BMW", "GS90010-1", "Zinc Plating")
  add_specification("CUMMINS", "CES 74018-03", "Zinc Plating")
  add_specification("DELPHI", "DX551200", "Zinc Plating")
  add_specification("DIN", "50979", "Zinc Plating")
  add_specification("FORD", "WSS-M1P85-B1/B5", "Zinc Plating")
  specifications.sort (a,b) -> sortByMultiple a, b, ["organization", "specification"]
  build_rows()
  $("#vp-specifications-content select").change ->
    build_rows()