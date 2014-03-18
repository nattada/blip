# == BSD2 LICENSE ==

# USAGE:
# python munge_json.py /path/to/console/output 'data-type'
# this script expects two command-line arguments in order:
# 1) the name of the raw console output (copied and pasted from blip's console) text file
# 2) the datatype you'd like to extract (e.g., 'basal-rate-segment')
# at present, you can only extract one datatype at a time

import json
import re
import sys

def main():

    with open(sys.argv[1], 'rU') as input_file:
        data_type = sys.argv[2]

        data_regex = re.compile('Patient data string (\[.+\]) fake_')

        for line in input_file:
            if line.find('Patient data string') != -1:
                data = data_regex.search(line).group(1)
                json_data = json.loads(data)

        data_to_print = [d for d in json_data if d['type'] == data_type]

        with open('blip-output.json', 'w') as f:
            print >> f, json.dumps(data_to_print, separators=(',', ': '), indent=4)

if __name__ == '__main__':
    main()