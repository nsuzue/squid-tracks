import React from 'react';
import { Table, Image } from 'react-bootstrap';

const TeamHeader = ({ player = { player: {} } }) =>
  <thead>
    <tr>
      <th>Player</th>
      {player.player.udemae ? <th>Rank</th> : null}
      <th />
      <th>Inked</th>
      <th>K+A (A)</th>
      <th>K / D</th>
      <th>S</th>
    </tr>
  </thead>;

const PlayerRow = ({ player }) => {
  return (
    <tr>
      <td>
        {player.player.nickname}
      </td>

      {player.player.udemae
        ? <td>
            {`${player.player.udemae.name}${player.player.udemae.s_plus_number
              ? player.player.udemae.s_plus_number
              : player.player.udemae.name === 'S+' ? 0 : ''}`}
          </td>
        : null}
      <td style={{ textAlign: 'center', background: 'darkgrey' }}>
        <Image
          src={`https://app.splatoon2.nintendo.net${player.player.weapon
            .thumbnail}`}
          style={{ maxHeight: 30 }}
          alt={player.player.weapon.name}
        />
      </td>
      <td>
        {player.game_paint_point}
      </td>
      <td>
        {`${player.kill_count + player.assist_count} (${player.assist_count})`}
      </td>
      <td>
        {`${player.kill_count} / ${player.death_count}`}
      </td>
      <td>
        {player.special_count}
      </td>
    </tr>
  );
};

const TeamStatTable = ({ result, team }) => {
  const total_k = team.reduce((sum, player) => sum + player.kill_count, 0);
  const total_a = team.reduce((sum, player) => sum + player.assist_count, 0);
  const total_d = team.reduce((sum, player) => sum + player.death_count, 0);
  const total_s = team.reduce((sum, player) => sum + player.special_count, 0);

  return (
    <Table striped bordered condensed hover>
      <TeamHeader player={team[0]} />
      <tbody>
        {team.map(player =>
          <PlayerRow key={player.player.nickname} player={player} />
        )}
      </tbody>
      <tfoot>
        <tr>
          <th>Totals</th>
          <th />
          {team[0].player.udemae ? <th /> : null}
          <td>
            {team.reduce((sum, player) => sum + player.game_paint_point, 0)}
          </td>
          <td>
            {`${total_k + total_a} (${total_d})`}
          </td>
          <td>
            {`${total_k} / ${total_a}`}
          </td>
          <td>
            {`${total_s}`}
          </td>
        </tr>
      </tfoot>
    </Table>
  );
};

export default TeamStatTable;
