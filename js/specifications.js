(function() {
  var add_specification, build_rows, filter_org, filter_proc, filter_spec, sortBy, sortByMultiple, specifications;

  specifications = [];

  filter_org = null;

  filter_spec = null;

  filter_proc = null;

  Array.prototype.unique = function() {
    var i, key, output, ref, results, value;
    output = {};
    for (key = i = 0, ref = this.length; 0 <= ref ? i < ref : i > ref; key = 0 <= ref ? ++i : --i) {
      output[this[key]] = this[key];
    }
    results = [];
    for (key in output) {
      value = output[key];
      results.push(value);
    }
    return results;
  };

  sortBy = function(key, a, b, r) {
    r = r ? 1 : -1;
    if (a[key] > b[key]) {
      return -1 * r;
    }
    if (a[key] < b[key]) {
      return +1 * r;
    }
    return 0;
  };

  sortByMultiple = function(a, b, keys) {
    var i, key, len, r;
    for (i = 0, len = keys.length; i < len; i++) {
      key = keys[i];
      r = sortBy(key, a, b);
      if (r !== 0) {
        return r;
      }
    }
    return 0;
  };

  add_specification = function(org, spec, proc) {
    var this_spec;
    this_spec = {
      organization: org,
      specification: spec,
      process: proc
    };
    return specifications.push(this_spec);
  };

  build_rows = function() {
    var available_organizations, available_plating_processes, available_specifications, blank_org_option, blank_proc_option, blank_spec_option, i, j, k, l, len, len1, len2, len3, new_row, org, org_cell, org_filter_dropdown, org_options, proc, proc_filter_dropdown, proc_options, process_cell, rows, spec, spec_cell, spec_filter_dropdown, spec_options, this_option;
    rows = [];
    available_organizations = [];
    available_specifications = [];
    available_plating_processes = [];
    org_filter_dropdown = $("#vp-specifications-organization-filter");
    spec_filter_dropdown = $("#vp-specifications-specification-filter");
    proc_filter_dropdown = $("#vp-specifications-process-filter");
    org_filter_dropdown.removeClass("d-none");
    spec_filter_dropdown.removeClass("d-none");
    proc_filter_dropdown.removeClass("d-none");
    filter_org = org_filter_dropdown.val();
    filter_spec = spec_filter_dropdown.val();
    filter_proc = proc_filter_dropdown.val();
    if (filter_org === "") {
      filter_org = null;
    }
    if (filter_spec === "") {
      filter_spec = null;
    }
    if (filter_proc === "") {
      filter_proc = null;
    }
    for (i = 0, len = specifications.length; i < len; i++) {
      spec = specifications[i];
      if (((filter_org == null) || filter_org === spec.organization) && ((filter_spec == null) || filter_spec === spec.specification) && ((filter_proc == null) || filter_proc === spec.process)) {
        available_organizations.push(spec.organization);
        available_specifications.push(spec.specification);
        available_plating_processes.push(spec.process);
        new_row = $("<tr>");
        org_cell = $("<td>").text(spec.organization);
        spec_cell = $("<td>").html("<a href=\"#\">" + spec.specification + "</a>");
        process_cell = $("<td>").text(spec.process);
        new_row.append(org_cell);
        new_row.append(spec_cell);
        new_row.append(process_cell);
        rows.push(new_row);
      }
    }
    $("#vp-specifications-table").html(rows);
    available_organizations = available_organizations.unique().sort();
    available_specifications = available_specifications.unique().sort();
    available_plating_processes = available_plating_processes.unique().sort();
    blank_org_option = $("<option>").val("").text("");
    blank_spec_option = $("<option>").val("").text("");
    blank_proc_option = $("<option>").val("").text("");
    org_options = [blank_org_option];
    spec_options = [blank_spec_option];
    proc_options = [blank_proc_option];
    for (j = 0, len1 = available_organizations.length; j < len1; j++) {
      org = available_organizations[j];
      this_option = $("<option>");
      this_option.val(org);
      this_option.text(org);
      org_options.push(this_option);
    }
    for (k = 0, len2 = available_specifications.length; k < len2; k++) {
      spec = available_specifications[k];
      this_option = $("<option>");
      this_option.val(spec);
      this_option.text(spec);
      spec_options.push(this_option);
    }
    for (l = 0, len3 = available_plating_processes.length; l < len3; l++) {
      proc = available_plating_processes[l];
      this_option = $("<option>");
      this_option.val(proc);
      this_option.text(proc);
      proc_options.push(this_option);
    }
    org_filter_dropdown.html(org_options).val(filter_org);
    spec_filter_dropdown.html(spec_options).val(filter_spec);
    return proc_filter_dropdown.html(proc_options).val(filter_proc);
  };

  $(function() {
    add_specification("ASTM", "B841", "Zinc-Nickel Plating");
    add_specification("GM", "GMW3200", "Tin-Zinc Plating");
    add_specification("ASTM", "B545", "Tin Plating");
    add_specification("ASTM", "B633", "Zinc Plating");
    add_specification("ASTM", "B689", "Nickel Plating");
    add_specification("ASTM", "B733", "Electroless Nickel Plating");
    add_specification("BMW", "GS90010-1", "Zinc Plating");
    add_specification("CUMMINS", "CES 74018-03", "Zinc Plating");
    add_specification("DELPHI", "DX551200", "Zinc Plating");
    add_specification("DIN", "50979", "Zinc Plating");
    add_specification("FORD", "WSS-M1P85-B1/B5", "Zinc Plating");
    specifications.sort(function(a, b) {
      return sortByMultiple(a, b, ["organization", "specification"]);
    });
    build_rows();
    return $("#vp-specifications-content select").change(function() {
      return build_rows();
    });
  });

}).call(this);
