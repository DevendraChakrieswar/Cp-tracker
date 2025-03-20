import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const DataTable = ({ data, isStudentReport = false, filter = "all" }) => {
  const [hasContests, setHasContests] = useState(false);
  
  const formatDate = (dateString) => {
    const [year, month, day] = dateString?.split('-') || [];
    return day && month && year ? `${day}/${month}/${year}` : '-';
  };

  useEffect(() => {
    const contestData = {
      leetcode: [],
      codechef: [],
      codeforces: [],
    };

    data.forEach(({ contests }) => {
      contestData.leetcode.push(...contests.leetcode);
      contestData.codechef.push(...contests.codechef);
      contestData.codeforces.push(...contests.codeforces);
    });

    const checkContests = {
      all: contestData.leetcode.length + contestData.codechef.length + contestData.codeforces.length > 0,
      leetcode: contestData.leetcode.length > 0,
      codechef: contestData.codechef.length > 0,
      codeforces: contestData.codeforces.length > 0,
    };

    setHasContests(checkContests[filter]);
    if (!checkContests[filter]) toast.error("No contests found");
  }, [data, filter]);

  const getPlatformColumns = (platform) => [
    'Contest Name',
    'Rank',
    'Problems Solved',
    'Date'
  ];

  return hasContests ? (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full border-collapse bg-white text-sm">
        <thead className="bg-gray-50">
          <tr>
            {!isStudentReport && (
              <>
                <th className="p-4 font-semibold border-b border-gray-200" rowSpan="2">
                  Roll.No
                </th>
                <th className="p-4 font-semibold border-b border-gray-200" rowSpan="2">
                  Name
                </th>
              </>
            )}
            
            {(filter === 'leetcode' || filter === 'all') && (
              <th className="p-4 font-semibold border-b border-gray-200 text-center" colSpan="4">
                Leetcode
              </th>
            )}
            
            {(filter === 'codechef' || filter === 'all') && (
              <th className="p-4 font-semibold border-b border-gray-200 text-center" colSpan="4">
                Codechef
              </th>
            )}
            
            {(filter === 'codeforces' || filter === 'all') && (
              <th className="p-4 font-semibold border-b border-gray-200 text-center" colSpan="4">
                Codeforces
              </th>
            )}
          </tr>
          
          <tr>
            {(filter === 'leetcode' || filter === 'all') && 
              getPlatformColumns('leetcode').map((header) => (
                <th key={header} className="p-3 font-medium border-b border-gray-200">
                  {header}
                </th>
              ))}
            
            {(filter === 'codechef' || filter === 'all') && 
              getPlatformColumns('codechef').map((header) => (
                <th key={header} className="p-3 font-medium border-b border-gray-200">
                  {header}
                </th>
              ))}
            
            {(filter === 'codeforces' || filter === 'all') && 
              getPlatformColumns('codeforces').map((header) => (
                <th key={header} className="p-3 font-medium border-b border-gray-200">
                  {header}
                </th>
              ))}
          </tr>
        </thead>
        
        <tbody>
          {data.map(({ student, contests }, studentIndex) => {
            const platformContests = {
              leetcode: contests.leetcode,
              codechef: contests.codechef,
              codeforces: contests.codeforces,
            };

            const maxRows = Math.max(
              ...Object.values(platformContests)
                .filter((_, idx) => 
                  filter === 'all' || 
                  filter === ['leetcode', 'codechef', 'codeforces'][idx]
                )
                .map(arr => arr.length)
            );

            return Array.from({ length: maxRows }).map((_, rowIndex) => (
              <tr 
                key={`${student.roll}-${rowIndex}`}
                className={studentIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                {rowIndex === 0 && !isStudentReport && (
                  <>
                    <td 
                      className="p-4 border-b border-gray-200 align-top" 
                      rowSpan={maxRows}
                    >
                      {student.roll}
                    </td>
                    <td 
                      className="p-4 border-b border-gray-200 align-top" 
                      rowSpan={maxRows}
                    >
                      {student.name}
                    </td>
                  </>
                )}

                {(filter === 'leetcode' || filter === 'all') && (
                  <>
                    <td className="p-3 border-b border-gray-200">
                      {platformContests.leetcode[rowIndex]?.contest?.title || '-'}
                    </td>
                    <td className="p-3 border-b border-gray-200 text-center">
                      {platformContests.leetcode[rowIndex]?.ranking || '-'}
                    </td>
                    <td className="p-3 border-b border-gray-200 text-center">
                      {platformContests.leetcode[rowIndex]?.problemsSolved || '-'}
                    </td>
                    <td className="p-3 border-b border-gray-200">
                      {platformContests.leetcode[rowIndex]?.contest?.startTime ? (
                        new Date(
                          platformContests.leetcode[rowIndex].contest.startTime * 1000
                        ).toLocaleDateString('en-IN')
                      ) : '-'}
                    </td>
                  </>
                )}

                {(filter === 'codechef' || filter === 'all') && (
                  <>
                    <td className="p-3 border-b border-gray-200">
                      {platformContests.codechef[rowIndex]?.name || '-'}
                    </td>
                    <td className="p-3 border-b border-gray-200 text-center">
                      {platformContests.codechef[rowIndex]?.rank || '-'}
                    </td>
                    <td className="p-3 border-b border-gray-200 text-center">
                      {platformContests.codechef[rowIndex]?.noOfProblems || '-'}
                    </td>
                    <td className="p-3 border-b border-gray-200">
                      {platformContests.codechef[rowIndex]?.end_date ? (
                        formatDate(platformContests.codechef[rowIndex].end_date)
                      ) : '-'}
                    </td>
                  </>
                )}

                {(filter === 'codeforces' || filter === 'all') && (
                  <>
                    <td className="p-3 border-b border-gray-200">
                      {platformContests.codeforces[rowIndex]?.contestName || '-'}
                    </td>
                    <td className="p-3 border-b border-gray-200 text-center">
                      {platformContests.codeforces[rowIndex]?.rank || '-'}
                    </td>
                    <td className="p-3 border-b border-gray-200 text-center">
                      {platformContests.codeforces[rowIndex]?.problemsSolved || '-'}
                    </td>
                    <td className="p-3 border-b border-gray-200">
                      {platformContests.codeforces[rowIndex]?.ratingUpdateTimeSeconds ? (
                        new Date(
                          platformContests.codeforces[rowIndex].ratingUpdateTimeSeconds * 1000
                        ).toLocaleDateString('en-IN')
                      ) : '-'}
                    </td>
                  </>
                )}
              </tr>
            ));
          })}
        </tbody>
      </table>
    </div>
  ) : null;
};

export default DataTable;