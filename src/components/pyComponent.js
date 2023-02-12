import React, { useState, useEffect } from 'react';
import './pyComponent.css'




const MyComp = (props) => {
  useEffect(() => {
    // console.log("faketrace: ", props.trace)
    // console.log("actual trace: ", props.trace2)
    // console.log("equal? ", props.trace === props.trace2)
    var data = {
      "code": {
        "main_code": "def recur_factorial(n):\n  if n == 1:\n    return n\n  else:\n    return n*recur_factorial(n-1)\nprint(recur_factorial(3))",
        "custom_modules": {
          "pg_setup": ""
        }
      },
      "trace": [
        {
          "line": 1,
          "event": "step_line",
          "func_name": "<module>",
          "file_name": "<string>",
          "globals": {},
          "ordered_globals": [],
          "stack_to_render": [],
          "heap": {},
          "stdout": ""
        },
        {
          "line": 6,
          "event": "step_line",
          "func_name": "<module>",
          "file_name": "<string>",
          "globals": {
            "recur_factorial": [
              "REF",
              1
            ]
          },
          "ordered_globals": [
            "recur_factorial"
          ],
          "stack_to_render": [],
          "heap": {
            "1": [
              "FUNCTION",
              "recur_factorial(n)",
              null
            ]
          },
          "stdout": ""
        },
        {
          "line": 1,
          "event": "call",
          "func_name": "recur_factorial",
          "file_name": "<string>",
          "globals": {
            "recur_factorial": [
              "REF",
              1
            ]
          },
          "ordered_globals": [
            "recur_factorial"
          ],
          "stack_to_render": [
            {
              "func_name": "recur_factorial",
              "file_name": "<string>",
              "is_parent": false,
              "frame_id": 1,
              "parent_frame_id_list": [],
              "encoded_locals": {
                "n": 3
              },
              "ordered_varnames": [
                "n"
              ],
              "is_zombie": false,
              "is_highlighted": true,
              "unique_hash": "recur_factorial_f1"
            }
          ],
          "heap": {
            "1": [
              "FUNCTION",
              "recur_factorial(n)",
              null
            ]
          },
          "stdout": ""
        },
        {
          "line": 2,
          "event": "step_line",
          "func_name": "recur_factorial",
          "file_name": "<string>",
          "globals": {
            "recur_factorial": [
              "REF",
              1
            ]
          },
          "ordered_globals": [
            "recur_factorial"
          ],
          "stack_to_render": [
            {
              "func_name": "recur_factorial",
              "file_name": "<string>",
              "is_parent": false,
              "frame_id": 1,
              "parent_frame_id_list": [],
              "encoded_locals": {
                "n": 3
              },
              "ordered_varnames": [
                "n"
              ],
              "is_zombie": false,
              "is_highlighted": true,
              "unique_hash": "recur_factorial_f1"
            }
          ],
          "heap": {
            "1": [
              "FUNCTION",
              "recur_factorial(n)",
              null
            ]
          },
          "stdout": ""
        },
        {
          "line": 5,
          "event": "step_line",
          "func_name": "recur_factorial",
          "file_name": "<string>",
          "globals": {
            "recur_factorial": [
              "REF",
              1
            ]
          },
          "ordered_globals": [
            "recur_factorial"
          ],
          "stack_to_render": [
            {
              "func_name": "recur_factorial",
              "file_name": "<string>",
              "is_parent": false,
              "frame_id": 1,
              "parent_frame_id_list": [],
              "encoded_locals": {
                "n": 3
              },
              "ordered_varnames": [
                "n"
              ],
              "is_zombie": false,
              "is_highlighted": true,
              "unique_hash": "recur_factorial_f1"
            }
          ],
          "heap": {
            "1": [
              "FUNCTION",
              "recur_factorial(n)",
              null
            ]
          },
          "stdout": ""
        },
        {
          "line": 1,
          "event": "call",
          "func_name": "recur_factorial",
          "file_name": "<string>",
          "globals": {
            "recur_factorial": [
              "REF",
              1
            ]
          },
          "ordered_globals": [
            "recur_factorial"
          ],
          "stack_to_render": [
            {
              "func_name": "recur_factorial",
              "file_name": "<string>",
              "is_parent": false,
              "frame_id": 1,
              "parent_frame_id_list": [],
              "encoded_locals": {
                "n": 3
              },
              "ordered_varnames": [
                "n"
              ],
              "is_zombie": false,
              "is_highlighted": false,
              "unique_hash": "recur_factorial_f1"
            },
            {
              "func_name": "recur_factorial",
              "file_name": "<string>",
              "is_parent": false,
              "frame_id": 2,
              "parent_frame_id_list": [],
              "encoded_locals": {
                "n": 2
              },
              "ordered_varnames": [
                "n"
              ],
              "is_zombie": false,
              "is_highlighted": true,
              "unique_hash": "recur_factorial_f2"
            }
          ],
          "heap": {
            "1": [
              "FUNCTION",
              "recur_factorial(n)",
              null
            ]
          },
          "stdout": ""
        },
        {
          "line": 2,
          "event": "step_line",
          "func_name": "recur_factorial",
          "file_name": "<string>",
          "globals": {
            "recur_factorial": [
              "REF",
              1
            ]
          },
          "ordered_globals": [
            "recur_factorial"
          ],
          "stack_to_render": [
            {
              "func_name": "recur_factorial",
              "file_name": "<string>",
              "is_parent": false,
              "frame_id": 1,
              "parent_frame_id_list": [],
              "encoded_locals": {
                "n": 3
              },
              "ordered_varnames": [
                "n"
              ],
              "is_zombie": false,
              "is_highlighted": false,
              "unique_hash": "recur_factorial_f1"
            },
            {
              "func_name": "recur_factorial",
              "file_name": "<string>",
              "is_parent": false,
              "frame_id": 2,
              "parent_frame_id_list": [],
              "encoded_locals": {
                "n": 2
              },
              "ordered_varnames": [
                "n"
              ],
              "is_zombie": false,
              "is_highlighted": true,
              "unique_hash": "recur_factorial_f2"
            }
          ],
          "heap": {
            "1": [
              "FUNCTION",
              "recur_factorial(n)",
              null
            ]
          },
          "stdout": ""
        },
        {
          "line": 5,
          "event": "step_line",
          "func_name": "recur_factorial",
          "file_name": "<string>",
          "globals": {
            "recur_factorial": [
              "REF",
              1
            ]
          },
          "ordered_globals": [
            "recur_factorial"
          ],
          "stack_to_render": [
            {
              "func_name": "recur_factorial",
              "file_name": "<string>",
              "is_parent": false,
              "frame_id": 1,
              "parent_frame_id_list": [],
              "encoded_locals": {
                "n": 3
              },
              "ordered_varnames": [
                "n"
              ],
              "is_zombie": false,
              "is_highlighted": false,
              "unique_hash": "recur_factorial_f1"
            },
            {
              "func_name": "recur_factorial",
              "file_name": "<string>",
              "is_parent": false,
              "frame_id": 2,
              "parent_frame_id_list": [],
              "encoded_locals": {
                "n": 2
              },
              "ordered_varnames": [
                "n"
              ],
              "is_zombie": false,
              "is_highlighted": true,
              "unique_hash": "recur_factorial_f2"
            }
          ],
          "heap": {
            "1": [
              "FUNCTION",
              "recur_factorial(n)",
              null
            ]
          },
          "stdout": ""
        },
        {
          "line": 1,
          "event": "call",
          "func_name": "recur_factorial",
          "file_name": "<string>",
          "globals": {
            "recur_factorial": [
              "REF",
              1
            ]
          },
          "ordered_globals": [
            "recur_factorial"
          ],
          "stack_to_render": [
            {
              "func_name": "recur_factorial",
              "file_name": "<string>",
              "is_parent": false,
              "frame_id": 1,
              "parent_frame_id_list": [],
              "encoded_locals": {
                "n": 3
              },
              "ordered_varnames": [
                "n"
              ],
              "is_zombie": false,
              "is_highlighted": false,
              "unique_hash": "recur_factorial_f1"
            },
            {
              "func_name": "recur_factorial",
              "file_name": "<string>",
              "is_parent": false,
              "frame_id": 2,
              "parent_frame_id_list": [],
              "encoded_locals": {
                "n": 2
              },
              "ordered_varnames": [
                "n"
              ],
              "is_zombie": false,
              "is_highlighted": false,
              "unique_hash": "recur_factorial_f2"
            },
            {
              "func_name": "recur_factorial",
              "file_name": "<string>",
              "is_parent": false,
              "frame_id": 3,
              "parent_frame_id_list": [],
              "encoded_locals": {
                "n": 1
              },
              "ordered_varnames": [
                "n"
              ],
              "is_zombie": false,
              "is_highlighted": true,
              "unique_hash": "recur_factorial_f3"
            }
          ],
          "heap": {
            "1": [
              "FUNCTION",
              "recur_factorial(n)",
              null
            ]
          },
          "stdout": ""
        },
        {
          "line": 2,
          "event": "step_line",
          "func_name": "recur_factorial",
          "file_name": "<string>",
          "globals": {
            "recur_factorial": [
              "REF",
              1
            ]
          },
          "ordered_globals": [
            "recur_factorial"
          ],
          "stack_to_render": [
            {
              "func_name": "recur_factorial",
              "file_name": "<string>",
              "is_parent": false,
              "frame_id": 1,
              "parent_frame_id_list": [],
              "encoded_locals": {
                "n": 3
              },
              "ordered_varnames": [
                "n"
              ],
              "is_zombie": false,
              "is_highlighted": false,
              "unique_hash": "recur_factorial_f1"
            },
            {
              "func_name": "recur_factorial",
              "file_name": "<string>",
              "is_parent": false,
              "frame_id": 2,
              "parent_frame_id_list": [],
              "encoded_locals": {
                "n": 2
              },
              "ordered_varnames": [
                "n"
              ],
              "is_zombie": false,
              "is_highlighted": false,
              "unique_hash": "recur_factorial_f2"
            },
            {
              "func_name": "recur_factorial",
              "file_name": "<string>",
              "is_parent": false,
              "frame_id": 3,
              "parent_frame_id_list": [],
              "encoded_locals": {
                "n": 1
              },
              "ordered_varnames": [
                "n"
              ],
              "is_zombie": false,
              "is_highlighted": true,
              "unique_hash": "recur_factorial_f3"
            }
          ],
          "heap": {
            "1": [
              "FUNCTION",
              "recur_factorial(n)",
              null
            ]
          },
          "stdout": ""
        },
        {
          "line": 3,
          "event": "step_line",
          "func_name": "recur_factorial",
          "file_name": "<string>",
          "globals": {
            "recur_factorial": [
              "REF",
              1
            ]
          },
          "ordered_globals": [
            "recur_factorial"
          ],
          "stack_to_render": [
            {
              "func_name": "recur_factorial",
              "file_name": "<string>",
              "is_parent": false,
              "frame_id": 1,
              "parent_frame_id_list": [],
              "encoded_locals": {
                "n": 3
              },
              "ordered_varnames": [
                "n"
              ],
              "is_zombie": false,
              "is_highlighted": false,
              "unique_hash": "recur_factorial_f1"
            },
            {
              "func_name": "recur_factorial",
              "file_name": "<string>",
              "is_parent": false,
              "frame_id": 2,
              "parent_frame_id_list": [],
              "encoded_locals": {
                "n": 2
              },
              "ordered_varnames": [
                "n"
              ],
              "is_zombie": false,
              "is_highlighted": false,
              "unique_hash": "recur_factorial_f2"
            },
            {
              "func_name": "recur_factorial",
              "file_name": "<string>",
              "is_parent": false,
              "frame_id": 3,
              "parent_frame_id_list": [],
              "encoded_locals": {
                "n": 1
              },
              "ordered_varnames": [
                "n"
              ],
              "is_zombie": false,
              "is_highlighted": true,
              "unique_hash": "recur_factorial_f3"
            }
          ],
          "heap": {
            "1": [
              "FUNCTION",
              "recur_factorial(n)",
              null
            ]
          },
          "stdout": ""
        },
        {
          "line": 3,
          "event": "return",
          "func_name": "recur_factorial",
          "file_name": "<string>",
          "globals": {
            "recur_factorial": [
              "REF",
              1
            ]
          },
          "ordered_globals": [
            "recur_factorial"
          ],
          "stack_to_render": [
            {
              "func_name": "recur_factorial",
              "file_name": "<string>",
              "is_parent": false,
              "frame_id": 1,
              "parent_frame_id_list": [],
              "encoded_locals": {
                "n": 3
              },
              "ordered_varnames": [
                "n"
              ],
              "is_zombie": false,
              "is_highlighted": false,
              "unique_hash": "recur_factorial_f1"
            },
            {
              "func_name": "recur_factorial",
              "file_name": "<string>",
              "is_parent": false,
              "frame_id": 2,
              "parent_frame_id_list": [],
              "encoded_locals": {
                "n": 2
              },
              "ordered_varnames": [
                "n"
              ],
              "is_zombie": false,
              "is_highlighted": false,
              "unique_hash": "recur_factorial_f2"
            },
            {
              "func_name": "recur_factorial",
              "file_name": "<string>",
              "is_parent": false,
              "frame_id": 3,
              "parent_frame_id_list": [],
              "encoded_locals": {
                "n": 1,
                "__return__": 1
              },
              "ordered_varnames": [
                "n",
                "__return__"
              ],
              "is_zombie": false,
              "is_highlighted": true,
              "unique_hash": "recur_factorial_f3"
            }
          ],
          "heap": {
            "1": [
              "FUNCTION",
              "recur_factorial(n)",
              null
            ]
          },
          "stdout": ""
        },
        {
          "line": 5,
          "event": "return",
          "func_name": "recur_factorial",
          "file_name": "<string>",
          "globals": {
            "recur_factorial": [
              "REF",
              1
            ]
          },
          "ordered_globals": [
            "recur_factorial"
          ],
          "stack_to_render": [
            {
              "func_name": "recur_factorial",
              "file_name": "<string>",
              "is_parent": false,
              "frame_id": 1,
              "parent_frame_id_list": [],
              "encoded_locals": {
                "n": 3
              },
              "ordered_varnames": [
                "n"
              ],
              "is_zombie": false,
              "is_highlighted": false,
              "unique_hash": "recur_factorial_f1"
            },
            {
              "func_name": "recur_factorial",
              "file_name": "<string>",
              "is_parent": false,
              "frame_id": 2,
              "parent_frame_id_list": [],
              "encoded_locals": {
                "n": 2,
                "__return__": 2
              },
              "ordered_varnames": [
                "n",
                "__return__"
              ],
              "is_zombie": false,
              "is_highlighted": true,
              "unique_hash": "recur_factorial_f2"
            },
            {
              "func_name": "recur_factorial",
              "file_name": "<string>",
              "is_parent": false,
              "frame_id": 3,
              "parent_frame_id_list": [],
              "encoded_locals": {
                "n": 1,
                "__return__": 1
              },
              "ordered_varnames": [
                "n",
                "__return__"
              ],
              "is_zombie": true,
              "is_highlighted": false,
              "unique_hash": "recur_factorial_f3_z"
            }
          ],
          "heap": {
            "1": [
              "FUNCTION",
              "recur_factorial(n)",
              null
            ]
          },
          "stdout": ""
        },
        {
          "line": 5,
          "event": "return",
          "func_name": "recur_factorial",
          "file_name": "<string>",
          "globals": {
            "recur_factorial": [
              "REF",
              1
            ]
          },
          "ordered_globals": [
            "recur_factorial"
          ],
          "stack_to_render": [
            {
              "func_name": "recur_factorial",
              "file_name": "<string>",
              "is_parent": false,
              "frame_id": 1,
              "parent_frame_id_list": [],
              "encoded_locals": {
                "n": 3,
                "__return__": 6
              },
              "ordered_varnames": [
                "n",
                "__return__"
              ],
              "is_zombie": false,
              "is_highlighted": true,
              "unique_hash": "recur_factorial_f1"
            },
            {
              "func_name": "recur_factorial",
              "file_name": "<string>",
              "is_parent": false,
              "frame_id": 2,
              "parent_frame_id_list": [],
              "encoded_locals": {
                "n": 2,
                "__return__": 2
              },
              "ordered_varnames": [
                "n",
                "__return__"
              ],
              "is_zombie": true,
              "is_highlighted": false,
              "unique_hash": "recur_factorial_f2_z"
            },
            {
              "func_name": "recur_factorial",
              "file_name": "<string>",
              "is_parent": false,
              "frame_id": 3,
              "parent_frame_id_list": [],
              "encoded_locals": {
                "n": 1,
                "__return__": 1
              },
              "ordered_varnames": [
                "n",
                "__return__"
              ],
              "is_zombie": true,
              "is_highlighted": false,
              "unique_hash": "recur_factorial_f3_z"
            }
          ],
          "heap": {
            "1": [
              "FUNCTION",
              "recur_factorial(n)",
              null
            ]
          },
          "stdout": ""
        },
        {
          "line": 6,
          "event": "return",
          "func_name": "<module>",
          "file_name": "<string>",
          "globals": {
            "recur_factorial": [
              "REF",
              1
            ]
          },
          "ordered_globals": [
            "recur_factorial"
          ],
          "stack_to_render": [
            {
              "func_name": "recur_factorial",
              "file_name": "<string>",
              "is_parent": false,
              "frame_id": 1,
              "parent_frame_id_list": [],
              "encoded_locals": {
                "n": 3,
                "__return__": 6
              },
              "ordered_varnames": [
                "n",
                "__return__"
              ],
              "is_zombie": true,
              "is_highlighted": false,
              "unique_hash": "recur_factorial_f1_z"
            },
            {
              "func_name": "recur_factorial",
              "file_name": "<string>",
              "is_parent": false,
              "frame_id": 2,
              "parent_frame_id_list": [],
              "encoded_locals": {
                "n": 2,
                "__return__": 2
              },
              "ordered_varnames": [
                "n",
                "__return__"
              ],
              "is_zombie": true,
              "is_highlighted": false,
              "unique_hash": "recur_factorial_f2_z"
            },
            {
              "func_name": "recur_factorial",
              "file_name": "<string>",
              "is_parent": false,
              "frame_id": 3,
              "parent_frame_id_list": [],
              "encoded_locals": {
                "n": 1,
                "__return__": 1
              },
              "ordered_varnames": [
                "n",
                "__return__"
              ],
              "is_zombie": true,
              "is_highlighted": false,
              "unique_hash": "recur_factorial_f3_z"
            }
          ],
          "heap": {
            "1": [
              "FUNCTION",
              "recur_factorial(n)",
              null
            ]
          },
          "stdout": "6\n"
        }
      ]
    }
    const myViz = new window.ExecutionVisualizer('myDiv', props.trace,
      {
        debugMode: false,
        showAllFrameLabels: true,
        lang: 'py3',
        highlightLines: true, arrowLines: false
      });
    myViz.redrawConnectors();

    let resizeTimer;

    window.addEventListener('resize', function (event) {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        // Run code here, resizing has "stopped"
        if (myViz) {
          myViz.redrawConnectors();
        }
      }, 250);
    });

    return () => { clearTimeout(resizeTimer) }
  }, [])

  return (<div className='pop-up'>
    <div id="myDiv" />
  </div>
  )
}

export default MyComp;