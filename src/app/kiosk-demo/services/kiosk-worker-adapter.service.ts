import { Injectable } from '@angular/core';

import {
  Branch,
  EventMediaAsset,
  GroupLevel,
  InterestGroup,
  LevelEvent,
  ScheduleSlot,
  Teacher,
} from '../models/kiosk.models';
import {
  WorkerBranchDto,
  WorkerEventDto,
  WorkerGroupDto,
  WorkerLevelDto,
  WorkerMediaDto,
  WorkerScheduleDto,
  WorkerTeacherDto,
} from '../models/worker-api.models';

@Injectable({ providedIn: 'root' })
export class KioskWorkerAdapterService {
  private readonly weekdayMap: Record<number, string> = {
    1: 'Lunes',
    2: 'Martes',
    3: 'Miércoles',
    4: 'Jueves',
    5: 'Viernes',
    6: 'Sábado',
    7: 'Domingo',
  };

  toBranch(dto: WorkerBranchDto): Branch {
    return {
      id: dto.slug,
      name: dto.name,
      city: this.extractCity(dto.address),
      address: dto.address ?? 'Dirección pendiente',
      note: dto.description ?? 'Sucursal activa en el catálogo BAFOTT.',
    };
  }

  toInterestGroup(dto: WorkerGroupDto): InterestGroup {
    const levels = dto.levels
      .slice()
      .sort((left, right) => left.id - right.id)
      .map((level) => this.toGroupLevel(level));

    return {
      id: dto.slug,
      name: this.normalizeGroupName(dto.name),
      audience: levels[0]?.shortDescription || dto.groupType.name,
      tagline:
        dto.description ?? dto.groupType.description ?? 'Programa disponible para exploración.',
      description:
        dto.description ?? dto.groupType.description ?? 'Contenido disponible en BAFOTT.',
      accent: this.accentFromGroupType(dto.groupType.slug),
      coverImage:
        dto.coverImageUrl ??
        levels[0]?.events[0]?.coverImage ??
        'assets/main-menu/juvenil1.jpeg',
      levels,
    };
  }

  toGroupLevel(dto: WorkerLevelDto): GroupLevel {
    return {
      id: dto.slug,
      name: dto.name,
      shortDescription:
        dto.shortDescription ?? dto.ageRange ?? 'Nivel disponible en catálogo interactivo.',
      description:
        dto.fullDescription ?? dto.shortDescription ?? 'Detalle pendiente desde base de datos.',
      schedules: dto.schedules.map((schedule) => this.toSchedule(schedule)),
      dances: dto.dances.map((dance) => dance.name),
      teacher: this.pickTeacher(dto.teachers),
      events: dto.events.map((event) => this.toLevelEvent(event)),
    };
  }

  private toSchedule(dto: WorkerScheduleDto): ScheduleSlot {
    return {
      day: this.weekdayMap[dto.dayOfWeek] ?? 'Sin día',
      time: `${dto.startTime} - ${dto.endTime}`,
      room: dto.roomName ?? 'Ambiente por definir',
    };
  }

  private toLevelEvent(dto: WorkerEventDto): LevelEvent {
    return {
      id: dto.slug,
      name: dto.name,
      year: dto.eventDate?.slice(0, 4) ?? '2026',
      summary: dto.description ?? 'Evento relacionado disponible en el archivo institucional.',
      coverImage:
        dto.coverImageUrl ??
        dto.media.find((item) => item.isFeatured || item.mediaCategory === 'cover')
          ?.thumbnailUrl ??
        dto.media[0]?.thumbnailUrl ??
        'assets/main-menu/juvenil1.jpeg',
      media: dto.media.map((item) => this.toEventMedia(item)),
    };
  }

  private toEventMedia(dto: WorkerMediaDto): EventMediaAsset {
    return {
      id: String(dto.id),
      title: dto.title ?? 'Contenido multimedia',
      type: dto.fileType,
      thumbnail: dto.thumbnailUrl ?? dto.fileUrl,
      description: dto.description ?? 'Registro disponible en el archivo multimedia.',
      source: dto.fileUrl,
      category:
        dto.mediaCategory ??
        (dto.fileType === 'video' ? 'video' : 'photo'),
      featured: dto.isFeatured ?? false,
    };
  }

  private pickTeacher(teachers: WorkerTeacherDto[]): Teacher {
    const mainTeacher =
      teachers.find((teacher) => teacher.isMain) ??
      teachers.find((teacher) => teacher.role === 'principal') ??
      teachers[0];

    return {
      name: mainTeacher?.fullName ?? 'Equipo docente',
      role: mainTeacher?.role ?? 'Docencia',
      bio: mainTeacher?.bio ?? 'Información docente disponible al conectar con Workers.',
      portrait: mainTeacher?.photoUrl ?? 'assets/face.jpg',
    };
  }

  private extractCity(address: string | null): string {
    if (!address) {
      return 'Bolivia';
    }

    if (address.toLowerCase().includes('sacaba')) {
      return 'Sacaba';
    }

    return 'Cochabamba';
  }

  private normalizeGroupName(name: string): string {
    const firstChunk = name.split(' ')[0];
    return firstChunk === 'Mayores' ? 'Adultos' : firstChunk;
  }

  private accentFromGroupType(groupTypeSlug: string): string {
    switch (groupTypeSlug) {
      case 'talleres':
        return 'from-emerald-200 via-white to-teal-100';
      case 'vacacionales':
        return 'from-sky-200 via-white to-cyan-100';
      case 'obras':
        return 'from-rose-200 via-white to-orange-100';
      default:
        return 'from-amber-200 via-white to-orange-100';
    }
  }
}
